import { FormikFormType } from '@/types/FormikForm';
import { Formik, Form } from 'formik';
import React from 'react';

const FormikForm = <T,>({
    children,
    initialState,
    schema,
    onSubmit,
}: FormikFormType<T>) => {
    return (
        <Formik
            initialValues={initialState}
            validationSchema={schema}
            onSubmit={(value) => onSubmit(value)}
        >
            {({ }) => (
                <Form className="flex flex-col gap-4">
                    {children}
                </Form>
            )}
        </Formik>
    );
};

export default FormikForm;
