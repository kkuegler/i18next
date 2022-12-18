import i18next from 'i18next';

const t1 = i18next.getFixedT(null, null, 'foo');

const t2 = i18next.getFixedT(null, 'alternate', 'foobar.deep');
t2('deeper.deeeeeper');
// t2('deeper').deeeeeper; // i18next would say: "key 'deeper (en)' returned an object instead of string."
t2('deeper', { returnObjects: true }).deeeeeper;

const t3 = i18next.getFixedT('en');
t3('foo');

// t3('alternate:foobar.deep.deeper.deeeeeper');
t3('foobar.deep.deeper.deeeeeper', { ns: 'alternate' });

const t4 = i18next.getFixedT('en', 'alternate', 'foobar');
t4('barfoo');

// @ts-expect-error
const t5 = i18next.getFixedT(null, null, 'xxx');

const t6 = i18next.getFixedT(null, 'alternate', 'foobar');
// @ts-expect-error
t6('xxx');

const t7 = i18next.getFixedT('en');
t7('bar');
t7('alternate:foobar.barfoo');
t7('foobar.barfoo');
t7('foobar.barfoo', { ns: 'alternate' });

const t8 = i18next.getFixedT('en', 'alternate');
t8('foobar.barfoo'); // ok
// this is not the most useful call, but maybe there are use-cases for prefixing everything:
t8('alternate:foobar.barfoo'); // TS error, but works ok
// other namespaces should be available via a key prefix:
t8('custom:foo'); // TS error, but works ok
// specifying the namespace as a parameter works
t8('foo', {
  ns: 'custom',
}); //ok

const t9 = i18next.getFixedT('en', ['alternate', 'custom']);
t9('foo'); // ok
t9('custom:foo'); // ok
// keys from both namespaces should be allowed in TS:
t9('foobar.barfoo'); // TS error, but works ok
t9('alternate:foobar.barfoo');
