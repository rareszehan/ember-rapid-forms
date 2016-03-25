import Ember from 'ember';

/*
A mixin that enriches a component that is attached to a model property that has validation
    support.

This mixin binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Ember.Mixin.create({
  init: function() {
    this._super(...arguments);
    Ember.assert(!Ember.isNone(this.get('propertyName')), 'propertyName is required.');
  },

  errors: Ember.computed('model.errors.[]', function() {
    if (!this.get('model.errors')){
      return [];
    }
    return this.get('model.errors').errorsFor(this.get('propertyName'));
  }),

  status: Ember.computed('errors.length', {
    get: function() {
      if (this.get('errors.length')) {
        if (this.get('form.showErrorsOnRender')) {
          this.set('canShowErrors', true);
        }
        return 'error';
      } else {
        return 'success';
      }
    }
  })
});
