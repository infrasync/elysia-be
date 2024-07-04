import { Elysia } from "elysia";
import { basicAuthModel, jwtAccessSetup, jwtRefreshSetup } from "../setup";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { and, eq, sql, desc } from 'drizzle-orm';


export const login = new Elysia()
  .use(basicAuthModel)
  .use(jwtAccessSetup)
  .use(jwtRefreshSetup)
  .post(
    "/login",
    async function handler({ body, set, jwtAccess, jwtRefresh }) {
      const existingUser = await db.query.users.findFirst(
        {
          where: (table, { eq: eqFn }) => {
            return eqFn(table.email, body.email)
          }
        }
      )
      if (!existingUser) {
        set.status = 403;
        return {
          message: "Invalid credentials.",
        };
      }
      const validPassword = await Bun.password.verify(
        body.password,
        existingUser.hashedPassword || ''
      );
      if (!validPassword) {
        set.status = 403;
        return {
          message: "Invalid credentials.",
        };
      }
      const refreshId = randomUUID();
      const refreshToken = await jwtRefresh.sign({
        id: refreshId,
      });
      const hashedToken = new Bun.CryptoHasher("sha512")
        .update(refreshToken)
        .digest("hex");

      await prisma.refreshToken.create({
        data: {
          hashedToken,
          id: refreshId,
          userId: existingUser.id,
        },
      });
      const accessToken = await jwtAccess.sign({
        id: String(existingUser.id),
      });
      return {
        accessToken,
      };
    },
    {
      body: "basicAuthModel",
    }
  );
