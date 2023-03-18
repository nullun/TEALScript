/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { expect } from 'chai';
import { sandbox, clients } from 'beaker-ts';
import algosdk from 'algosdk';
import { AbiTest } from './contracts/clients/abitest_client';

let appClient: AbiTest;

// eslint-disable-next-line no-unused-vars
async function dryrun(methodName: string) {
  const atc = new algosdk.AtomicTransactionComposer();
  atc.addMethodCall({
    appID: appClient.appId,
    method: algosdk.getMethodByName(appClient.methods, methodName),
    sender: appClient.sender,
    signer: appClient.signer,
    suggestedParams: await appClient.getSuggestedParams(),
  });
  const txns = atc.buildGroup().map((t) => t.txn);
  const sigs = (await atc.gatherSignatures())
    .map((s) => (algosdk.decodeObj(s) as algosdk.SignedTransaction).sig);
  const dr = await algosdk.createDryrun({
    client: appClient.client,
    txns: [{ txn: txns[0], sig: sigs[0] }],
  });
  const drrTxn = new algosdk.DryrunResult(await appClient.client.dryrun(dr).do()).txns[0];
  // eslint-disable-next-line no-console
  console.log(drrTxn.appTrace(
    { maxValueWidth: process.stdout.columns / 3, topOfStackFirst: true },
  ));
}

describe('ABI', function () {
  before(async function () {
    const acct = (await sandbox.getAccounts()).pop()!;

    appClient = new AbiTest({
      client: clients.sandboxAlgod(),
      signer: acct.signer,
      sender: acct.addr,
    });

    await appClient.create({ extraPages: 3 });
    await appClient.optIn();

    const atc = new algosdk.AtomicTransactionComposer();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: acct.addr,
      to: appClient.appAddress,
      amount: 127400,
      suggestedParams: await clients.sandboxAlgod().getTransactionParams().do(),
    });

    atc.addTransaction({ txn, signer: acct.signer });
    await atc.execute(clients.sandboxAlgod(), 3);
  });

  it('staticArray', async function () {
    const ret = await appClient.staticArray();
    expect(ret.returnValue).to.equal(BigInt(22));
  });

  it('returnStaticArray', async function () {
    const ret = await appClient.returnStaticArray();
    expect(ret.returnValue).to.deep.equal([BigInt(11), BigInt(22), BigInt(33)]);
  });

  it('staticArrayArg', async function () {
    const ret = await appClient.staticArrayArg({
      a: [BigInt(11), BigInt(22), BigInt(33)],
    });
    expect(ret.returnValue).to.deep.equal(BigInt(22));
  });

  it('nonLiteralStaticArrayElements', async function () {
    const ret = await appClient.nonLiteralStaticArrayElements();
    expect(ret.returnValue).to.equal(BigInt(22));
  });

  it('mixedStaticArrayElements', async function () {
    const ret = await appClient.mixedStaticArrayElements();
    expect(ret.returnValue).to.equal(BigInt(1 + 4 + 7));
  });

  it('nonLiteralStaticArrayAccess', async function () {
    const ret = await appClient.nonLiteralStaticArrayAccess();
    expect(ret.returnValue).to.equal(BigInt(33));
  });

  it('setStaticArrayElement', async function () {
    const ret = await appClient.setStaticArrayElement();
    expect(ret.returnValue).to.equal(BigInt(222));
  });

  it('staticArrayInStorageRef', async function () {
    const ret = await appClient.staticArrayInStorageRef(
      { boxes: [{ appIndex: 0, name: new Uint8Array(Buffer.from('bRef')) }] },
    );
    expect(ret.returnValue).to.deep.equal([BigInt(22), BigInt(22), BigInt(22)]);
  });

  it('updateStaticArrayInStorageRef', async function () {
    const ret = await appClient.updateStaticArrayInStorageRef(
      { boxes: [{ appIndex: 0, name: new Uint8Array(Buffer.from('bRef')) }] },
    );

    expect(ret.returnValue).to.deep.equal([BigInt(111), BigInt(222), BigInt(333)]);
  });

  it('staticArrayInStorageMap', async function () {
    const ret = await appClient.staticArrayInStorageMap(
      { boxes: [{ appIndex: 0, name: new Uint8Array(Buffer.from('bMap')) }] },
    );
    expect(ret.returnValue).to.deep.equal([BigInt(22), BigInt(22), BigInt(22)]);
  });

  it('updateStaticArrayInStorageMap', async function () {
    const ret = await appClient.updateStaticArrayInStorageMap(
      { boxes: [{ appIndex: 0, name: new Uint8Array(Buffer.from('bMap')) }] },
    );

    expect(ret.returnValue).to.deep.equal([BigInt(1111), BigInt(2222), BigInt(3333)]);
  });

  it('nestedStaticArray', async function () {
    const ret = await appClient.nestedStaticArray();
    expect(ret.returnValue).to.equal(BigInt(55));
  });

  it('updateNestedStaticArrayElement', async function () {
    const ret = await appClient.updateNestedStaticArrayElement();
    expect(ret.returnValue).to.equal(BigInt(555));
  });

  it('updateNestedStaticArray', async function () {
    const ret = await appClient.updateNestedStaticArray();
    expect(ret.returnValue).to.equal(BigInt(555));
  });

  it('threeDimensionalUint16Array', async function () {
    const ret = await appClient.threeDimensionalUint16Array();
    expect(ret.returnValue).to.equal(BigInt(888));
  });

  it('simpleTuple', async function () {
    const ret = await appClient.simpleTuple();
    expect(ret.returnValue).to.equal(BigInt(44));
  });

  it('arrayInTuple', async function () {
    const ret = await appClient.arrayInTuple();
    expect(ret.returnValue).to.equal(BigInt(44));
  });

  it('tupleInArray', async function () {
    const ret = await appClient.tupleInArray();
    expect(ret.returnValue).to.equal(BigInt(44));
  });

  it('tupleInTuple', async function () {
    const ret = await appClient.tupleInTuple();
    expect(ret.returnValue).to.equal(BigInt(66));
  });

  it('shortTypeNotation', async function () {
    const ret = await appClient.shortTypeNotation();
    expect(ret.returnValue).to.equal(BigInt(66));
  });

  it('disgusting', async function () {
    const ret = await appClient.disgusting();
    expect(ret.returnValue).to.equal(BigInt(8888));
  });

  it('returnTuple', async function () {
    const ret = await appClient.returnTuple();
    expect(ret.returnValue).to.deep.equal([BigInt(11), BigInt(22), BigInt(33)]);
  });

  it('tupleArg', async function () {
    const ret = await appClient.tupleArg({
      a: [BigInt(11), BigInt(22), BigInt(33)],
    });
    expect(ret.returnValue).to.deep.equal(BigInt(22));
  });

  it('dynamicArray', async function () {
    const ret = await appClient.dynamicArray();
    expect(ret.returnValue).to.equal(BigInt(22));
  });

  it('returnDynamicArray', async function () {
    const ret = await appClient.returnDynamicArray();
    expect(ret.returnValue).to.deep.equal([BigInt(11), BigInt(22), BigInt(33)]);
  });

  it('dynamicArrayArg', async function () {
    const ret = await appClient.dynamicArrayArg({
      a: [BigInt(11), BigInt(22), BigInt(33)],
    });
    expect(ret.returnValue).to.deep.equal(BigInt(22));
  });

  it('updateDynamicArrayElement', async function () {
    const ret = await appClient.updateDynamicArrayElement();
    expect(ret.returnValue).to.equal(BigInt(222));
  });

  it('dynamicTupleArray', async function () {
    const ret = await appClient.dynamicTupleArray();
    expect(ret.returnValue).to.equal(BigInt(44));
  });

  it('returnTupleWithDyamicArray', async function () {
    const ret = await appClient.returnTupleWithDyamicArray();
    expect(ret.returnValue).to.deep.equal(
      [BigInt(1), BigInt(2), [BigInt(3), BigInt(4)], [BigInt(5), BigInt(6)]],
    );
  });

  it('returnDynamicArrayFromTuple', async function () {
    const ret = await appClient.returnDynamicArrayFromTuple();
    expect(ret.returnValue).to.deep.equal(
      [BigInt(7), BigInt(8)],
    );
  });

  it('updateDynamicArrayInTuple', async function () {
    const a: {old: BigInt[] | BigInt, new: BigInt[] | BigInt}[] = [
      { old: BigInt(9), new: BigInt(99) },
      { old: [BigInt(8)], new: [BigInt(10), BigInt(11)] },
      { old: [BigInt(7)], new: [BigInt(12), BigInt(13)] },
      { old: [BigInt(6)], new: [BigInt(14), BigInt(15)] },
      { old: [BigInt(5)], new: [BigInt(16), BigInt(17)] },
    ];

    const ret = await appClient.updateDynamicArrayInTuple();
    expect(ret.returnValue).to.deep.equal([a[0].new, a[1].new, a[2].new, a[3].new, a[4].new]);
  });

  it('nonLiteralDynamicElementInTuple', async function () {
    const ret = await appClient.nonLiteralDynamicElementInTuple();
    expect(ret.returnValue).to.deep.equal(
      [
        BigInt(1),
        BigInt(2),
        [BigInt(3), BigInt(4)],
        [BigInt(5), BigInt(6)],
        [BigInt(7), BigInt(8)]],
    );
  });

  it('arrayPush', async function () {
    const ret = await appClient.arrayPush();
    expect(ret.returnValue).to.deep.equal(
      [BigInt(1), BigInt(2), BigInt(3)],
    );
  });

  it('arrayPop', async function () {
    const ret = await appClient.arrayPop();
    expect(ret.returnValue).to.deep.equal([BigInt(1), BigInt(2)]);
  });

  it('arrayPopValue', async function () {
    const ret = await appClient.arrayPopValue();
    expect(ret.returnValue).to.equal(BigInt(3));
  });

  it('arraySplice', async function () {
    const ret = await appClient.arraySplice();
    expect(ret.returnValue).to.deep.equal([1, 3].map((n) => BigInt(n)));
  });

  it('arraySpliceValue', async function () {
    const ret = await appClient.arraySpliceValue();
    expect(ret.returnValue).to.deep.equal([2, 3, 4, 5, 6, 7, 8].map((n) => BigInt(n)));
  });

  it('dynamicArrayElements', async function () {
    const ret = await appClient.dynamicArrayElements();
    expect(ret.returnValue).to.deep.equal([1, 2, 3].map((n) => BigInt(n)));
  });

  it('spliceLastElement', async function () {
    const ret = await appClient.spliceLastElement();
    expect(ret.returnValue).to.deep.equal([1, 2].map((n) => BigInt(n)));
  });

  it('spliceLastElementValue', async function () {
    const ret = await appClient.spliceLastElementValue();
    expect(ret.returnValue).to.deep.equal([3].map((n) => BigInt(n)));
  });

  it('spliceFirstElement', async function () {
    const ret = await appClient.spliceFirstElement();
    expect(ret.returnValue).to.deep.equal([2, 3].map((n) => BigInt(n)));
  });

  it('spliceFirstElementValue', async function () {
    const ret = await appClient.spliceFirstElementValue();
    expect(ret.returnValue).to.deep.equal([1].map((n) => BigInt(n)));
  });

  it('stringReturn', async function () {
    const s = 'Hello World!';
    const ret = await appClient.stringReturn();
    expect(ret.returnValue).to.equal(s);
  });

  it('stringArg', async function () {
    const s = 'Hello World!';
    await appClient.stringArg({ s });
    // asert is in contract
  });

  it('stringInTuple', async function () {
    const s = 'Hello World!';
    const ret = await appClient.stringInTuple();
    expect(ret.returnValue).to.deep.equal([BigInt(1), [BigInt(2)], s, [BigInt(3)]]);
  });

  it('accesStringInTuple', async function () {
    const s = 'Hello World!';
    const ret = await appClient.accesStringInTuple();
    expect(ret.returnValue).to.equal(s);
  });

  it('updateStringInTuple', async function () {
    const a = [
      { old: BigInt(9), new: BigInt(99) },
      { old: [BigInt(8)], new: [BigInt(10), BigInt(11)] },
      { old: 'Hi?', new: 'Hello World!' },
      { old: [BigInt(6)], new: [BigInt(14), BigInt(15)] },
      { old: [BigInt(5)], new: [BigInt(16), BigInt(17)] },
    ];

    const ret = await appClient.updateStringInTuple();
    expect(ret.returnValue).to.deep.equal([a[0].new, a[1].new, a[2].new, a[3].new, a[4].new]);
  });

  it('updateTupleWithOnlyDynamicTypes', async function () {
    const ret = await appClient.updateTupleWithOnlyDynamicTypes();
    expect(ret.returnValue).to.deep.equal(
      [
        [BigInt(4), BigInt(5)],
        [BigInt(6), BigInt(7)],
        [BigInt(8), BigInt(9)]],
    );
  });

  it('shortenDynamicElementInTuple', async function () {
    const ret = await appClient.shortenDynamicElementInTuple();
    expect(ret.returnValue).to.deep.equal(
      [
        [BigInt(5)],
        [BigInt(6)],
        [BigInt(7)]],
    );
  });

  it('namedTuple', async function () {
    const ret = await appClient.namedTuple();
    expect(ret.returnValue).to.equal('Hello World!');
  });
});
