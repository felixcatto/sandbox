// import 'bootstrap/dist/css/bootstrap.min.css';
// import { createForm } from 'final-form';
// import arrayMutators from 'final-form-arrays';

// const onSubmit = values => {
//   console.log(JSON.stringify(values, 0, 2));
// };
// const composeValidators = (...validators) => value =>
//   validators.reduce((error, validator) => error || validator(value), undefined);
// const required = value => value === '' ? 'Required' : undefined;
// const mustBeVasa = value => value !== 'vasa' ? 'Name must be vasa' : undefined;
// const valid = value => undefined;

// const initialState = {};
// initialState.advanced = {};
// const finalForm = createForm({
//   onSubmit,
//   mutators: { ...arrayMutators },
//   initialValues: {
//     name: 'vasa',
//     class: '',
//     advanced: {
//       lvl: '322',
//     },
//     customers: [],
//   },
//   // validate: (values) => {
//   //   console.log(values);
//   //   const errors = {};
//   //   if (values.name !== 'vasa') {
//   //     errors.name = 'Name must be vasa';
//   //   }
//   //   if (values.class !== 'ninja') {
//   //     errors.class = 'Class must be ninja';
//   //   }
//   //   return errors;
//   // },
// });



// finalForm.subscribe(
//   (formState) => {
//     // console.log('updateForm');
//     initialState.formState = formState;
//   },
//   {
//     values: true,
//     errors: true,
//     valid: true,
//   },
// );

// const fields = [
//   {
//     fieldName: 'name',
//     getValidator: () => composeValidators(required, mustBeVasa),
//   }, {
//     fieldName: 'class',
//     getValidator: () => required,
//   },
// ];

// fields.forEach(({ fieldName, getValidator }) => {
//   finalForm.registerField(
//     fieldName,
//     fieldState => {
//       // console.log(`updateField ${fieldName}`);
//       // console.log(fieldState);
//       initialState[fieldName] = fieldState;
//     }, {
//       value: true,
//       touched: true,
//       valid: true,
//       error: true,
//     }, {
//       getValidator,
//       // getValidator: () => (value) => {
//       //   console.log(value);
//       //   if (fieldName === 'name' && value !== 'vasa') {
//       //     return 'Name must be vasa';
//       //   }
//       // },
//     },
//   );
// });

// finalForm.registerField(
//   'advanced.lvl',
//   (fieldState) => {
//     // console.log(fieldState);
//     // вот тут возможно требуется некоторая магия по авто созданию обьектов 'advanced'
//     initialState.advanced.lvl = fieldState;
//   }, {
//     value: true,
//     touched: true,
//     valid: true,
//     error: true,
//   }, {
//     getValidator: () => (value) => (value !== '322' ? 'Value must be 322' : undefined),
//   }
// );

// finalForm.registerField(
//   'customers',
//   (fieldState) => {
//     console.log(fieldState);
//     initialState.customers = fieldState;
//   }, {
//     value: true,
//     touched: true,
//     valid: true,
//     error: true,
//   }, {
//     getValidator: () => (value) => {
//       console.log(value);
//     },
//   }
// );
// finalForm.registerField(
//   'customers.firstName',
//   (fieldState) => {
//     console.log(fieldState);
//     initialState.customers = fieldState;
//   }, {
//     value: true,
//     touched: true,
//     valid: true,
//     error: true,
//   }, {
//     getValidator: () => (value) => {
//       console.log(value);
//     },
//   }
// );
// // finalForm.mutators.push('customers', { firstName: '', lastName: '' });
// // finalForm.mutators.push('customers', undefined);



// const formEl = document.querySelector('.js-form');
// const nameEl = document.querySelector('.js-name');
// const classEl = document.querySelector('.js-class');
// const lvlEl = document.querySelector('.js-lvl');
// const firstNameEl = document.querySelector('.js-firstname');
// nameEl.value = initialState.name.value;
// classEl.value = initialState.class.value;
// lvlEl.value = initialState.advanced.lvl.value;

// formEl.addEventListener('submit', (e) => {
//   event.preventDefault();
//   finalForm.submit();
//   console.log(initialState.formState.errors);
// });
// nameEl.addEventListener('change', e => initialState.name.change(e.target.value));
// nameEl.addEventListener('blur', () => initialState.name.blur());
// nameEl.addEventListener('focus', () => initialState.name.focus());
// classEl.addEventListener('change', e => initialState.class.change(e.target.value));
// classEl.addEventListener('blur', () => initialState.class.blur());
// classEl.addEventListener('focus', () => initialState.class.focus());
// lvlEl.addEventListener('change', e => initialState.advanced.lvl.change(e.target.value));
// lvlEl.addEventListener('blur', () => initialState.advanced.lvl.blur());
// lvlEl.addEventListener('focus', () => initialState.advanced.lvl.focus());


// firstNameEl.addEventListener('change', e => initialState.customers.firstName.change(e.target.value));
// firstNameEl.addEventListener('blur', () => initialState.customers.firstName.blur());
// firstNameEl.addEventListener('focus', () => initialState.customers.firstName.focus());


// window.finalForm = finalForm;
// window.initialState = initialState;




























// import 'bootstrap/dist/css/bootstrap.min.css';
import { createForm } from 'final-form';
import arrayMutators from 'final-form-arrays';
window.bundle = {
  createForm,
  arrayMutators,
};
// const initialState = {};
// const finalForm = createForm({
//   onSubmit: values => console.log(JSON.stringify(values, 0, 2)),
//   mutators: { ...arrayMutators },
//   initialValues: {
//     name: 'John',
//     customers: [],
//   },
// });

// finalForm.registerField(
//   'name',
//   fieldState => {
//     initialState.name = fieldState;
//   }, {}, {
//     getValidator: () => value => (value === '' ? 'Required' : undefined),
//   },
// );

// finalForm.registerField(
//   'customers',
//   (fieldState) => {
//     initialState.customers = fieldState;
//   }, {}, {
//     getValidator: () => (value) => {
//       console.log(value);
//     },
//   }
// );

// finalForm.registerField(
//   'customers.megaplan',
//   (fieldState) => {
//     initialState.megaplan = fieldState;
//   }, {}, {
//     getValidator: () => (value) => {
//       console.log(value);
//     },
//   }
// );

// // // finalForm.mutators.push('customers', { firstName: '', lastName: '' });
// finalForm.mutators.push('customers', { megaplan: '' });


// const formEl = document.querySelector('.js-form');
// const nameEl = document.querySelector('.js-name');
// const firstNameEl = document.querySelector('.js-firstname');

// formEl.addEventListener('submit', (e) => {
//   event.preventDefault();
//   finalForm.submit();
// });
// nameEl.addEventListener('change', e => initialState.name.change(e.target.value));
// nameEl.addEventListener('blur', () => initialState.name.blur());
// nameEl.addEventListener('focus', () => initialState.name.focus());
// firstNameEl.addEventListener('change', e => initialState.customers.change(e.target.value));
// firstNameEl.addEventListener('blur', () => initialState.customers.blur());
// firstNameEl.addEventListener('focus', () => initialState.customers.focus());
