import { FormikFormType } from '@/types/FormikForm';
import { Formik, Form } from 'formik';
import React from 'react';

const FormikForm = ({
    children,
    initialState,
    schema,
    onSubmit,
    className
}: FormikFormType) => {
    return (
        <Formik
            initialValues={initialState}
            validationSchema={schema}
            validateOnChange={true}
            onSubmit={(value) => onSubmit(value)}
        >
            {(formik) => (
                <Form className={` w-full   `}>
                    <div className={`${className}`}>

                        {typeof children === 'function' ? children(formik) : children}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormikForm;
