const test = require('tap').test;
const emv = require('../../../index');

const validEmv = {
    'primitive tag': '5A09000000000000000000',
    'constructed tag': '710A0102030405040708090A',
    'long length tag': '5F0F8103AABBCC',
    'message without dols': '5F2A0201245F34010182021C008407A0000000031010950580000000009A031102249B0268009C01009F02060000000000009F03060000000000009F0607A00000000310109F0802008C9F0902008C9F100706010A039000009F1A0201249F2608423158936ED6C38F9F2701809F3303E0B0C89F34034103029F3501229F360200019F3704ACAC66E89F5800DF0100DF0200DF0400',
    'message without dols and constructed tag': '5F2A0201245F34010182021C008407A0000000031010950580000000009A031102249B0268009C01009F02060000000000009F03060000000000009F0607A00000000310109F0802008C9F0902008C9F100706010A039000009F1A0201249F2608423158936ED6C38F9F2701809F3303E0B0C89F34034103029F3501229F360200019F3704ACAC66E89F5800DF0100DF0200DF0400710A0102030405040708090A',
    'message without dols and long length tag': '5F2A0201245F34010182021C008407A0000000031010950580000000009A031102249B0268009C01009F02060000000000009F03060000000000009F0607A00000000310109F0802008C9F0902008C9F100706010A039000009F1A0201249F2608423158936ED6C38F9F2701809F3303E0B0C89F34034103029F3501229F360200019F3704ACAC66E89F5800DF0100DF0200DF04005F0F8103AABBCC',
    'message without dols, constructed tag and long length tag': '5F2A0201245F34010182021C008407A0000000031010950580000000009A031102249B0268009C01009F02060000000000009F03060000000000009F0607A00000000310109F0802008C9F0902008C9F100706010A039000009F1A0201249F2608423158936ED6C38F9F2701809F3303E0B0C89F34034103029F3501229F360200019F3704ACAC66E89F5800DF0100DF0200DF0400710A0102030405040708090A5F0F8103AABBCC',
    'message with dols': '8C159F02069F03069F1A0295055F2A029A039C019F37049F02060000000000009F03060000000000005A090000000000000000005F3401019F360200B69F2608322566E3E44A3DEA9F2701809F090200009F33036040209F1A0206089F350114570F0000000000000000000D27056209405F2A0206089A031707189F410215579C01019F3704000015579F53015A',
    'message with dols and constructed tag': '8C159F02069F03069F1A0295055F2A029A039C019F37049F02060000000000009F03060000000000005A090000000000000000005F3401019F360200B69F2608322566E3E44A3DEA9F2701809F090200009F33036040209F1A0206089F350114570F0000000000000000000D27056209405F2A0206089A031707189F410215579C01019F3704000015579F53015A710A0102030405040708090A',
    'message with dols and long length tag': '8C159F02069F03069F1A0295055F2A029A039C019F37049F02060000000000009F03060000000000005A090000000000000000005F3401019F360200B69F2608322566E3E44A3DEA9F2701809F090200009F33036040209F1A0206089F350114570F0000000000000000000D27056209405F2A0206089A031707189F410215579C01019F3704000015579F53015A5F0F8103AABBCC',
    'message with dols, constructed tag and long length tag': '8C159F02069F03069F1A0295055F2A029A039C019F37049F02060000000000009F03060000000000005A090000000000000000005F3401019F360200B69F2608322566E3E44A3DEA9F2701809F090200009F33036040209F1A0206089F350114570F0000000000000000000D27056209405F2A0206089A031707189F410215579C01019F3704000015579F53015A5F0F8103AABBCC710A0102030405040708090A'
};

const invalidEmv = {
    'constructed tag value length less than expected': '71030102030405040708090A',
    'constructed tag with first inner tag value length less than expected': '710A010A030405040708090A',
    'constructed tag with second inner tag value length less than expected': '710A0102030405060708090A',
    'tag with value length less than expected': '5F0F0AAABBCC',
    'long length tag with value length less than expected': '5F0F8105AABBCC',
    'ascii message': 'qwerty'
};

test('EMV parsing', (t) => {
    t.test('EMV encode/decode', assert => {
        Object.keys(validEmv).forEach(k => {
            let decoded = emv.tagsDecode(validEmv[k], {});
            let decodedDols = emv.dolDecode(decoded);

            let encoded = emv.tagsEncode(decoded);

            let secondaryDecoded = emv.tagsDecode(encoded, {});
            let secondaryDecodedDols = emv.dolDecode(secondaryDecoded);

            assert.deepEqual(decoded, secondaryDecoded, `ensure no data loss when encoding/decoding ${k}`);
            assert.deepEqual(decodedDols, secondaryDecodedDols, `ensure no data loss when encoding/dol-decoding ${k}`);
        });

        Object.keys(invalidEmv).forEach(k => {
            assert.throws(() => { emv.tagsDecode(invalidEmv[k], {}); }, new Error('Data integrity error'), `ensure decoding ${k} throws error`);
        });
        assert.end();
    });

    t.test('Flatten EMV', assert => {
        assert.same(emv.flatten(), {}, 'No arguments passed');
        assert.same(emv.flatten({
            transactionDate: {tag: '9A', len: 3, val: '190226'}
        }), {transactionDate: '190226'}, 'Single tag');
        assert.same(emv.flatten({
            transactionDate: {tag: '9A', len: 3, val: '190226'},
            amountAuthorised: {tag: '9F02', len: 6, val: '000000000000'},
            amountOther: {tag: '9F03', len: 6, val: '000000000000'}
        }), {transactionDate: '190226', amountAuthorised: '000000000000', amountOther: '000000000000'}, 'Multiple tags');
        assert.end();
    });
    t.test('Unflatten EMV', assert => {
        assert.same(emv.unflatten(), {}, 'No arguments passed');
        assert.same(emv.unflatten({
            transactionDate: '190226'
        }), {
            transactionDate: {
                tag: '9A',
                len: 3,
                val: '190226'
            }
        }, 'Single tag');
        assert.same(emv.unflatten({
            transactionDate: '190226',
            amountAuthorised: '000000000000',
            amountOther: '000000000000'
        }), {
            transactionDate: {
                tag: '9A',
                len: '03',
                val: '190226'
            },
            amountAuthorised: {
                tag: '9F02',
                len: '06',
                val: '000000000000'
            },
            amountOther: {
                tag: '9F03',
                len: '06',
                val: '000000000000'
            }
        }, 'Multiple tags');
        assert.end();
    });

    t.end();
});
