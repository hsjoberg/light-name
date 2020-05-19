import { assert, assertStrictEq } from "https://deno.land/std/testing/asserts.ts";
import { open } from "https://deno.land/x/sqlite/mod.ts";

import getUserRequest from "./getUser.ts";
import { createUserTable } from "../../tools/tools.ts";

const USERNAME = "test1";
const PUBKEY = "thepublickey";
const ROUTEHINTS = `[]`;

const db = await open("./db-getUser.sqlite3");

createUserTable(db);

await db.query(
  `INSERT INTO user (publicKey, name, routeHints) VALUES (:publicKey, :name, :routeHints)`,
  { publicKey: PUBKEY, name: USERNAME, routeHints: ROUTEHINTS },
);

/** It is possible to get a user by pubkey. */
Deno.test(async function getUser() {
  const response = {} as any;

  await getUserRequest({
    response,
    app: {},
    params: {
      username: "test1",
    },
    router: {},
    state: {
      db,
    }
  } as any, async () => {});

  assert(response.body !== undefined);
  assertStrictEq(response.body.username, USERNAME);
  assertStrictEq(response.body.publicKey, PUBKEY);
  assertStrictEq(JSON.stringify(response.body.routeHints), ROUTEHINTS);
});

/** Attempting to get unknown user returns error. */
Deno.test(async function getUser() {
  const response = {} as any;

  await getUserRequest({
    response,
    app: {},
    params: {
      username: "doesntexist",
    },
    router: {},
    state: {
      db,
    }
  } as any, (async () => {}));

  assert(response.body !== undefined);
  assertStrictEq(response.status, 400);
  assertStrictEq(response.body.status, "ERROR");
});