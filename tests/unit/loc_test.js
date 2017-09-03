import {
  module,
  test
} from 'qunit';
import {
  loc,
  getStrings,
  setStrings
} from 'at-ember-string';

let oldStrings;

module('loc', {
  beforeEach() {
    oldStrings = getStrings();
    setStrings({
      '_Hello World': 'Bonjour le monde',
      '_Hello %@': 'Bonjour %@',
      '_Hello %@ %@': 'Bonjour %@ %@',
      '_Hello %@# %@#': 'Bonjour %@2 %@1'
    });
  },

  afterEach() {
    setStrings(oldStrings);
  }
});

test('\'_Hello World\'.loc() => \'Bonjour le monde\'', function(assert) {
  assert.equal(loc('_Hello World'), 'Bonjour le monde');
});

test('\'_Hello %@ %@\'.loc(\'John\', \'Doe\') => \'Bonjour John Doe\'', function(assert) {
  assert.equal(loc('_Hello %@ %@', ['John', 'Doe']), 'Bonjour John Doe');
});

test('\'_Hello %@# %@#\'.loc(\'John\', \'Doe\') => \'Bonjour Doe John\'', function(assert) {
  assert.equal(loc('_Hello %@# %@#', ['John', 'Doe']), 'Bonjour Doe John');
});

test('\'_Not In Strings\'.loc() => \'_Not In Strings\'', function(assert) {
  assert.equal(loc('_Not In Strings'), '_Not In Strings');
});

test('works with argument form', function(assert) {
  assert.equal(loc('_Hello %@', 'John'), 'Bonjour John');
  assert.equal(loc('_Hello %@ %@', ['John'], 'Doe'), 'Bonjour [John] Doe');
});
