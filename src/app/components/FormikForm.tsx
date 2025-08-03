import { FormikFormType } from '@/types/FormikForm';
import { Formik, Form } from 'formik';
import React from 'react';

const FormikForm =({
    children,
    initialState,
    schema,
    onSubmit,
}:FormikFormType) => {
    return (
        <Formik
            initialValues={initialState}
            validationSchema={schema}
            validateOnChange={true}
            onSubmit={(value) => onSubmit(value)}
        >
            {(formik) => (
                <Form className="flex flex-col gap-4">
                    {typeof children === 'function' ? children(formik) : children}
                </Form>
            )}
        </Formik>
    );
};

export default FormikForm;
