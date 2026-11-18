"use client";
import { Formik, Form } from "formik";
import { contactYupSchema } from "@/lib/yupSchemas";
const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  comment: "",
};
import FormField from "@/components/form/FormField";
import SubmitButton from "@/components/form/SubmitButton";
import TextAreaField from "@/components/form/TextAreaField";

const page = () => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleSubmit = async (
    values: typeof INITIAL_VALUES,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      console.log(values);
      await sleep(1000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center pt-15 px-4">
      <div>
        <p className="text-5xl text-center mb-2">Contact</p>
        <p className="text-xs text-center font-normal text-zinc-600">
          {
            "N\'hésitez pas à nous contacter pour toute question ou demande d\'information."
          }
        </p>
      </div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={contactYupSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="p-6 w-full sm:w-150 h-full">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  name="name"
                  type="text"
                  placeholder="prénom"
                  label="name"
                />
                <FormField
                  name="email"
                  type="text"
                  placeholder="E-mail"
                  label="email"
                />
                <FormField
                  name="phone"
                  type="text"
                  placeholder="Téléphone"
                  label="phone"
                  css="sm:col-span-2"
                />
                <TextAreaField
                  name="comment"
                  type="text"
                  placeholder="Commentaire"
                  label="comment"
                  css="sm:col-span-2 resize-none"
                />

                <div className="flex justify-start">
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Envoyé"
                    css="py-3 px-8"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;
