// @flow
import React from "react";

function Description() {
  return (
    <div className="description">
      <em>
        This example is using{" "}
        <a href="https://jaredpalmer.com/formik" target="_blank">
          Formik
        </a>.
      </em>
      <pre>{`<Formik 
  initialValues={{ cents: 812590 }}
  onSubmit={values => alert(JSON.stringify(values, null, 2))}
  render={() => (
    <Form>
      <Field name="cents" component={MoneyField} />
      <button type="submit">Submit</button>
    </Form>
  )}>
</Formik>`}</pre>
    </div>
  );
}

export default Description;
