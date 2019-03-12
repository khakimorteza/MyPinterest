# schema

## users

| column name | column type | details                 |
| ----------- | ----------- | ----------------------- |
| id          | integer     | null false, primary key |
| username    | string      | null false              |
| emaile      | string      | null false              |

## boards

| column name | column type | details                 |
| ----------- | ----------- | ----------------------- |
| id          | integer     | null false, primary key |
| title       | string      | null false              |
| user_id     | integer     | references users(id)    |

### pins

| column name | column type | details                 |
| ----------- | ----------- | ----------------------- |
| id          | integer     | null false, primary key |
| user_id     | integer     | references users(id)    |
| board_id    | integer     | references boards(id)   |
| url         | string      | null false              |
