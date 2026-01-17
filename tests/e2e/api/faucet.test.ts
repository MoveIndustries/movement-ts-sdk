// Copyright © Move Industries
// SPDX-License-Identifier: Apache-2.0

import { Account, InputViewFunctionJsonData } from "../../../src";
import { FUND_AMOUNT } from "../../unit/helper";
import { getMovementClient } from "../helper";

describe("Faucet", () => {
  test("it should fund an account", async () => {
    const { movement } = getMovementClient();
    const testAccount = Account.generate();

    // Fund the account
    await movement.fundAccount({ accountAddress: testAccount.accountAddress, amount: FUND_AMOUNT });

    // Check the balance
    const payload: InputViewFunctionJsonData = {
      function: "0x1::coin::balance",
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
      functionArguments: [testAccount.accountAddress.toString()],
    };
    const [balance] = await movement.viewJson<[number]>({ payload: payload });
    expect(Number(balance)).toBe(FUND_AMOUNT);
  });
});
