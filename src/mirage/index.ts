import { belongsTo, createServer, Model } from "miragejs";
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

const SECRET_KEY = "123456";

interface TokenResponseProps {
  username: string;
}

export function makeServer() {
  createServer({
    models: {
      transaction: Model.extend({
        user: belongsTo("user")
      }),
      user: Model
    },
    seeds(server) {
      server.db.loadData({
        transactions: [
          {
            id: 1,
            title: "Freelance de website",
            type: "deposit",
            category: "Dev",
            amount: 6000,
            createdAt: new Date("2021-02-12 09:00:00"),
            userId: 1
          },
          {
            id: 2,
            title: "Aluguel",
            type: "withdraw",
            category: "Casa",
            amount: 1100,
            createdAt: new Date("2021-02-14 11:00:00"),
            userId: 1
          }
        ],
        users: [
          {
            id: 1,
            username: "admin",
            password: hashSync("admin", 8)
          }
        ]
      });
    },
    routes() {
      this.namespace = "api";

      this.post("/auth", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        const user: any = schema
          .all("user")
          .models.find(model => model.attrs.username === data.username);

        if (!user) {
          return {
            error: "Não existe um usuário com esse nome."
          };
        }

        const validatedPassword: any = compareSync(
          data.password,
          user.attrs.password
        );

        if (!validatedPassword) {
          return {
            error: "Não existe um usuário com esse nome"
          };
        }

        const token = jwt.sign({ username: data.username }, SECRET_KEY);

        return {
          user: {
            username: data.username,
            token
          }
        };
      });

      this.post("/signup", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        const user: any = schema
          .all("user")
          .models.find(model => model.attrs.username === data.username);

        if (user) {
          return {
            error: "Já existe um usuário com esse nome."
          };
        }

        const newPassword = hashSync(data.password, 8);

        schema.create("user", {
          ...data,
          password: newPassword
        });

        const token = jwt.sign({ username: data.username }, SECRET_KEY);

        return {
          user: {
            username: data.username,
            token
          }
        };
      });

      this.get("/transactions", (schema, request) => {
        const { username, token } = request.requestHeaders;

        const parsedToken: TokenResponseProps = jwt.verify(
          token,
          SECRET_KEY
        ) as TokenResponseProps;

        if (parsedToken.username !== username) {
          return {
            error: "Envie um token."
          };
        }

        const user: any = schema
          .all("user")
          .models.find(model => model.attrs.username === username);

        const transactions = schema
          .all("transaction")
          .models.filter(
            transaction => transaction.attrs.userId === parseInt(user.id)
          );

        return {
          transactions
        };
      });

      this.post("/transactions", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        const { username, token } = request.requestHeaders;

        const parsedToken: TokenResponseProps = jwt.verify(
          token,
          SECRET_KEY
        ) as TokenResponseProps;

        if (parsedToken.username !== username) {
          return {
            error: "Envie um token."
          };
        }

        const user: any = schema
          .all("user")
          .models.find(model => model.attrs.username === username);

        return schema.create("transaction", {
          ...data,
          createdAt: new Date(),
          userId: parseInt(user.id)
        });
      });
    }
  });
}
