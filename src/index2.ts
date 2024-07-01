import { ApolloClient, ApolloError, InMemoryCache, gql } from '@apollo/client';
import { EntityModelAppUser } from './generated';
import { FailResponse, Response, SuccessResponse, UpdateUserVariables, UserInput } from './interfaces';


interface ResultData {
    // data に入ってくるオブジェクト名と、その型
    updateUser: Response
}

const isFailResponse = (arg: unknown): arg is FailResponse => {
    const r = arg as Response
    return !r.success
}

// クエリを実行してデータを取得する関数
const updateUser = async (variables: UpdateUserVariables) => {

    // Apollo Clientのインスタンスを作成
    const client = new ApolloClient({
        uri: 'http://localhost:3000/graphql', // GraphQLエンドポイントのURL
        cache: new InMemoryCache()
    });

    // GraphQLクエリを定義
    const mutationUpdateUser = gql`
        mutation UpdateUser($user: UserInput) {
          updateUser(user: $user) {
            ... on SuccessResponse {
              success
            }
            ... on FailResponse {
              error
              message
              success
            }
          }
        }
        `;

    try {
        const result = await client.mutate<ResultData, UpdateUserVariables>({
            mutation: mutationUpdateUser,
            variables: variables
        }); // 戻り値はResultData、引数は、UpdateUserVariablesの型であると指定

        if (result.errors) {
            console.error('GraphQL errors:', result.errors);
        } else {
            const response = result.data?.updateUser
            if (isFailResponse(response)) {
                console.log('Update user result:', response?.success);
                console.log('message:', response?.message);
                // console.log('error:', response!.error);
            } else {
                // 成功レスポンスの処理
                console.log('User updated successfully:', response?.success);
            }
        }
    } catch (error) {
        console.error('Error update data:', error);
    }
}

const main = async (args: string[]) => {
    // データを取得する関数を呼び出し
    updateUser({
        user: { userId: 'u001', companyCode: 'com003' }
    });
}

// コマンドライン引数を取得
const args = process.argv.slice(2);

// モジュールが直接実行された場合のみ処理を実行
if (require.main === module) {
    main(args);
}
