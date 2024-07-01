import { ApolloClient, ApolloError, InMemoryCache, gql } from '@apollo/client';
import { EntityModelAppUser } from './generated';
import { User } from './interfaces';

interface ResultData {
    // data に入ってくるオブジェクト名と、その型
    users: User[];
}

const fetchUsers = async () => {

    // Apollo Clientのインスタンスを作成
    const client = new ApolloClient({
        uri: 'http://localhost:3000/graphql', // GraphQLエンドポイントのURL
        cache: new InMemoryCache()
    });

    // GraphQLクエリを定義
    const queryGetUsers = gql`
        query GetUsers {
          users {
            id
            email
          }
        }
        `;

    // クエリを実行してデータを取得する関数
    try {
        console.log('Loading...')
        const result = await client.query<ResultData>({ query: queryGetUsers }); // 戻り値の型を ResultData と指定
        if (result.error) {  //実際はここはなさそう？ 
            console.error('Error fetching data:', result.error)
        } else {
            console.table(result.data.users)
        }
    } catch (error) {
        console.error('error:', error);
        if (error instanceof ApolloError) {
            console.error('GraphQL errors:');
            console.table(error.graphQLErrors);
            console.error(error.networkError);
        };
        console.log('例外発生')
    } finally {
        console.log('Loading complete.')
    }
}


const main = async (args: string[]) => {
    // データを取得する関数を呼び出し
    fetchUsers();
}

// コマンドライン引数を取得
const args = process.argv.slice(2);

// モジュールが直接実行された場合のみ処理を実行
if (require.main === module) {
    main(args);
}