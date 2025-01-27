/* eslint-disable no-return-assign */
import { Contract } from '../../src/lib/index';
import { IfTest } from './if.algo';

class DummyContract extends Contract {}

const STRING_CONST = 'foo';
const NUM_CONST = 123;
const NESTED_CONST = NUM_CONST;
const COMPUTED_CONST = NUM_CONST + NESTED_CONST;
const MUTLI_COMPUTED_CONST = NUM_CONST + NESTED_CONST * COMPUTED_CONST;

class SchemaContract extends Contract {
  globalUint = GlobalStateMap<uint8, uint64>({ maxKeys: 1 });

  globalBytes = GlobalStateMap<uint16, bytes>({ maxKeys: 2 });

  localUint = LocalStateMap<uint8, uint64>({ maxKeys: 3 });

  localBytes = LocalStateMap<uint16, bytes>({ maxKeys: 4 });
}

// eslint-disable-next-line no-unused-vars
class Templates extends Contract {
  bytesTmplVar = TemplateVar<bytes>();

  uint64TmplVar = TemplateVar<uint64>();

  bytes32TmplVar = TemplateVar<bytes32>();

  bytes64TmplVar = TemplateVar<bytes64>();

  tmpl(): void {
    log(this.bytesTmplVar);
    assert(this.uint64TmplVar);
  }

  specificLengthTemplateVar(): void {
    ed25519VerifyBare(this.bytesTmplVar, this.bytes64TmplVar, this.bytes32TmplVar);
  }
}

// eslint-disable-next-line no-unused-vars
class ProgramVersion extends Contract {
  programVersion = 8;
}

// eslint-disable-next-line no-unused-vars
class GeneralTest extends Contract {
  programVersion = 10;

  scratch = ScratchSlot<uint64>(0);

  dynamicScratch = DynamicScratchSlot<uint64>();

  gKey = GlobalStateKey<uint64>();

  storageArray = GlobalStateKey<StaticArray<uint64, 3>>();

  txnTypeEnum(): void {
    assert(this.txnGroup[0].typeEnum === TransactionType.ApplicationCall);
  }

  txnGroupLength(): void {
    assert(this.txnGroup.length === 1);
  }

  asserts(arg1: boolean, arg2: boolean): void {
    asserts(arg1, arg2, arg1 === arg2);
  }

  verifyTxnFromArg(somePay: PayTxn): void {
    verifyTxn(somePay, { receiver: this.app.address, amount: 100_000 });
  }

  verifyTxnFromTxnGroup(): void {
    verifyTxn(this.txnGroup[0], { sender: this.txn.sender });
  }

  verifyTxnCondition(): void {
    verifyTxn(this.txn, {
      applicationID: { greaterThan: 1 },
    });
  }

  verifyTxnIncludedIn(): void {
    verifyTxn(this.txn, {
      sender: { includedIn: [this.txn.sender] },
    });
  }

  verifyTxnNotIncludedIn(): void {
    verifyTxn(this.txn, {
      sender: { notIncludedIn: [globals.zeroAddress] },
    });
  }

  submitPendingGroup(): void {
    this.pendingGroup.addPayment({ amount: 0, receiver: this.app.address, isFirstTxn: true });
    this.pendingGroup.addPayment({ amount: 0, receiver: this.app.address, note: 'foo' });
    this.pendingGroup.submit();
  }

  methodWithTxnArgs(): void {
    sendMethodCall<[PayTxn, MethodCall<[uint64], void>], void>({
      name: 'foo',
      methodArgs: [
        { amount: 100_000, receiver: this.txn.sender },
        {
          name: 'bar',
          applicationID: AppID.fromUint64(1337),
          methodArgs: [1],
        },
      ],
    });
  }

  shift(): void {
    assert(1 << 2 === 4);
    assert(4 >> 1 === 2);
  }

  fromBytes(): void {
    assert(Address.fromBytes('abc').minBalance);
  }

  fromUint64(): void {
    log(AppID.fromUint64(123).creator);
    log(AssetID.fromUint64(123).creator);
  }

  bzeroFunction(): void {
    const n = 1;
    const x: bytes = bzero(2); // 2
    const y: bytes = bzero(n); // 3
    const z: [uint64, uint<8>] = bzero<[uint64, uint<8>]>(); // 12
    assert(len(x + y + z) === 12);
  }

  /**
   * This is my event
   * It has some args
   */
  myEvent = new EventLogger<{
    /** Some app */
    app: AppID;
    /** Some number */
    num: uint64;
  }>();

  events(): void {
    this.myEvent.log({ app: this.app, num: 1 });
  }

  letOptimization(a: uint64[]): uint64[] {
    assert(a[0]);
    let b = a;
    b = [1, 2, 3];

    return b;
  }

  staticContractProperties(): void {
    sendAppCall({
      onCompletion: OnCompletion.NoOp,
      approvalProgram: DummyContract.approvalProgram(),
      clearStateProgram: DummyContract.clearProgram(),
      localNumByteSlice: DummyContract.schema.local.numByteSlice,
      localNumUint: DummyContract.schema.local.numUint,
      globalNumByteSlice: DummyContract.schema.global.numByteSlice,
      globalNumUint: DummyContract.schema.global.numUint,
    });
  }

  numberToString(): void {
    const n = 1;
    const s = '1';
    assert(n.toString() === s);
  }

  methodOnParens(): void {
    assert((1 + 2).toString() === '3');
  }

  stringSubstring(): void {
    const s = 'abcdef';
    assert(s.substring(1, 3) === 'bc');
  }

  idProperty(): void {
    const app = AppID.zeroIndex;
    assert(AppID.fromUint64(app.id) === app);

    const asa = AssetID.zeroIndex;
    assert(AssetID.fromUint64(asa.id) === asa);
  }

  scratchSlot(): void {
    this.scratch.value = 1337;
    assert(this.scratch.value === 1337);
  }

  ecdsa(): void {
    ecdsaVerify('Secp256k1', '' as bytes32, '' as bytes32, '' as bytes32, '' as bytes32, '' as bytes32);
    const d = ecdsaPkDecompress('Secp256k1', '' as bytes<33>);
    log(d.y);
    log(d.x);

    const r = ecdsaPkRecover('Secp256k1', '' as bytes32, 1, '' as bytes32, '' as bytes32);
    log(r.y);
    log(r.x);
  }

  verifyTxnTypes(): void {
    verifyPayTxn(this.txnGroup[0], {
      amount: { greaterThan: 0 },
    });

    verifyAppCallTxn(this.txnGroup[0], {
      applicationID: AppID.fromUint64(0),
      applicationArgs: {
        0: 'foo',
        1: {
          includedIn: ['bar', 'baz'],
        },
      },
    });

    verifyAssetTransferTxn(this.txnGroup[0], {
      assetReceiver: this.app.address,
    });

    verifyAssetConfigTxn(this.txnGroup[0], {
      configAsset: AssetID.fromUint64(0),
    });

    verifyKeyRegTxn(this.txnGroup[0], {
      voteFirst: 1337,
    });
  }

  stringPlusEquals(): void {
    let s = 'foo';
    s += 'bar';
    assert(s === 'foobar');
  }

  importedProgram(): bytes {
    return IfTest.approvalProgram();
  }

  callPrivateDefinedLater(): void {
    log(this.privateMethod('hello'));
  }

  private privateMethod(msg: string): string {
    return msg;
  }

  interalPublicMethod(a: uint64, b: uint64): uint64 {
    return a + b;
  }

  callInternalPublicMethod(): void {
    assert(this.interalPublicMethod(1, 2) === 3);
  }

  appLoadScratch(): void {
    log(this.txnGroup[1].loadScratch(2) as bytes);
  }

  uintNWithUnderscore(): uint256 {
    return <uint256>123_456;
  }

  opUp(): void {
    increaseOpcodeBudget();
    for (let i = 1; i < 75; i += 1) {
      assert(i);
    }
  }

  returnValueOnAssignment(): string {
    let message = 'hi';

    if (this.txn.sender === this.app.address) {
      message = 'in block';
    }
    // eslint-disable-next-line no-unused-vars
    return (message = 'bye');
  }

  returnArrayValueOnAssignment(): uint64 {
    const a: StaticArray<uint64, 3> = [1, 2, 3];

    return (a[0] = 4);
  }

  returnStorageValueOnAssignment(): uint64 {
    this.gKey.value = 1;

    return (this.gKey.value = 2);
  }

  returnOperatorAssignmentValue(): uint64 {
    let a = 1;

    return (a += 2);
  }

  returnArrayValueOnOperatorAssignment(): uint64 {
    const a: StaticArray<uint64, 3> = [1, 2, 3];

    return (a[0] += 4);
  }

  returnArrayInStorageValueOnOperatorAssignment(): uint64 {
    this.storageArray.value = [1, 2, 3];

    return (this.storageArray.value[0] += 4);
  }

  consts(): void {
    assert(STRING_CONST === 'foo');
    assert(NUM_CONST === 123);
    assert(NESTED_CONST === 123);
  }

  assertWithMessage(): void {
    assert(false, 'this is false');
  }

  opcodeAliases(): void {
    extractUint16(bzero(64), 0);
    extractUint32(bzero(64), 0);
    extractUint64(bzero(64), 0);
    ed25519VerifyBare(bzero(64), bzero(64), bzero(32));
    ed25519Verify(bzero(64), bzero(64), bzero(32));
  }

  vrfVerifyOp(): void {
    increaseOpcodeBudget();
    increaseOpcodeBudget();
    increaseOpcodeBudget();
    increaseOpcodeBudget();
    increaseOpcodeBudget();
    increaseOpcodeBudget();
    increaseOpcodeBudget();
    increaseOpcodeBudget();
    increaseOpcodeBudget();

    const r = vrfVefiry('VrfAlgorand', bzero(32) as bytes, bzero(80), bzero(32));
    assert(!r.verified);
    log(r.output);
  }

  ecMath(): void {
    ecScalarMul('BN254g1', '', '');
    ecPairingCheck('BN254g1', '', '');
    const scalars: bytes32[] = [bzero(32), bzero(32)];
    ecMultiScalarMul('BN254g1', '', scalars);
    ecSubgroupCheck('BN254g1', '');
    ecMapTo('BN254g1', '');
    ecAdd('BN254g1', '', '');
  }

  gitxn() {
    log(this.lastInnerGroup[0].sender);

    const anotherTxn = this.lastInnerGroup[1];

    log(anotherTxn.sender);
  }

  getSetBytes() {
    log(setbit('foo', 0, true));
    getbit('foo', 0);
    getbyte('foo', 0);
    setbyte('foo', 0, 1);
  }

  getSetUint64() {
    assert(setbit(123, 0, true));
    getbit(123, 0);
  }

  blockOp() {
    log(blocks[globals.round - 1].seed);
    assert(blocks[globals.round - 1].timestamp);
  }

  b64() {
    log(base64Decode('StdEncoding', ''));
  }

  json() {
    log(jsonRef('JSONObject', '', ''));
    log(jsonRef('JSONString', '', ''));
    assert(jsonRef('JSONUint64', '', ''));
  }

  bitlenOp() {
    bitlen(123);
    bitlen('foo');
  }

  computedConst() {
    assert(COMPUTED_CONST);
  }

  multiComputedConst() {
    assert(MUTLI_COMPUTED_CONST);
  }

  readSchema(): void {
    assert(SchemaContract.schema.global.numUint === 1);
    assert(SchemaContract.schema.global.numByteSlice === 2);
    assert(SchemaContract.schema.local.numUint === 3);
    assert(SchemaContract.schema.local.numByteSlice === 4);
  }

  comparisonOr(): boolean {
    return this.txn.sender === globals.zeroAddress || this.txn.sender === globals.zeroAddress;
  }

  // eslint-disable-next-line no-unused-vars
  txnArgsMethod(_pay1: PayTxn): void {}

  callTxnArgsMethod(): void {
    sendMethodCall<typeof GeneralTest.prototype.txnArgsMethod>({
      methodArgs: [{ receiver: this.app.address, amount: 0 }],
    });
  }

  staticValueLen(x: uint256): void {
    assert(len(x));
  }

  staticTypeLen(): void {
    assert(len<uint256>());
  }

  dynamicScratchSlot(): void {
    this.dynamicScratch(1).value = 1337;
    assert(this.dynamicScratch(1).value === 1337);
  }

  incrementScratchSlot(): void {
    this.scratch.value = 1337;
    this.scratch.value += 1;
    assert(this.scratch.value === 1338);
  }

  incrementDynamicScratchSlot(): void {
    this.dynamicScratch(2).value = 1337;
    this.dynamicScratch(2).value += 1;
    assert(this.dynamicScratch(2).value === 1338);
  }

  fromAddress(): void {
    const a = Address.fromAddress('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ');
    assert(a === Address.zeroAddress);
  }

  earlyReturn(a: uint64): uint64 {
    if (a === 1) {
      return 2;
    }
    const b = a + 1;
    return b;
  }

  assetMethodArgs(): void {
    sendMethodCall<[AssetReference], void>({
      name: 'foo',
      methodArgs: [AssetID.fromUint64(1)],
    });
  }

  pageOne = BoxKey<bytes>();

  pageTwo = BoxKey<bytes>();

  multipleProgramPages(): void {
    sendAppCall({
      approvalProgram: [this.pageOne.value, this.pageTwo.value],
      clearStateProgram: [this.pageOne.value, this.pageTwo.value],
    });
  }

  assertComment() {
    assert(false, 'this is false');
  }

  throwErrorMessage() {
    throw Error('this is an error');
  }

  orLiteralType(a: uint64, b: uint64): void {
    const foo = a && b === 1 ? 2 : 0;
    assert(foo);

    const bar = a && b === 0 ? '2' : '0';
    log(bar);
  }
}
