import * as Yup from 'yup';

const passwordsRule = {
  password: Yup.string()
    .required('Le mot de passe est requis')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(
      /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
      'Le mot de passe doit contenir au moins un caractère spécial',
    ),
  confirmPassword: Yup.string()
    .required('Le mot de passe de confirmation est requis')
    .oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre')
};

const emailRule = {
  email: Yup.string()
    .required('L\'adresse e-mail est requise')
    .email('Format d\'adresse e-mail invalide'),
};

const commentRules = {
  comment: Yup.string()
  .required('Le commentaire est requis')
  .max(500, 'Le commentaire ne doit pas dépasser 500 caractères')
  .min(10, 'Le commentaire doit contenir au moins 10 caractères')
};

export const signupYupSchema = Yup.object({
  ...emailRule,
  ...passwordsRule,
  name: Yup.string().required('Le nom est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
  adress: Yup.string().required('L\'adresse est requise'),
  postalCode: Yup.string().required('Le code postal est requis'),
  city: Yup.string().required('La ville est requise'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
  sex: Yup.string().oneOf(['male', 'female', 'other'], 'Le sexe est requis'),
});

export const loginYupSchema = Yup.object({
  identifier: Yup.string().required('l\'adresse e-mail est requise'),
  password: passwordsRule.password,
});

export const contactYupSchema = Yup.object({
  ...emailRule,
  name: Yup.string().required('Le nom est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
  comment: commentRules.comment,
});

export const passwordYupSchema = Yup.object(passwordsRule);

export const emailYupSchema = Yup.object(emailRule);
