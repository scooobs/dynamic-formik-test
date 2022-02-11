import "./App.css";
import { Field, FieldArray, Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "./utils/zod-formik-adapter";
import { ErrorMessage } from "./ErrorMessage";

const schema = z.object({
  entries: z.array(
    z.union([
      z.string().min(7, { message: "Must be at least 7 characters long" }),
      z.number().gt(3, { message: "Must be greater than 3" }),
    ])
  ),
});

function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{ entries: ["Seven", 2, "Twenty", "fdfew"] }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        validationSchema={toFormikValidationSchema(schema)}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="entries">
              {({ remove, insert }) => (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      insert(0, "");
                    }}
                  >
                    Add string
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      insert(0, 0);
                    }}
                  >
                    Add number
                  </button>
                  {values.entries && values.entries.length > 0 ? (
                    values.entries.map((entry, index) => (
                      <div key={index}>
                        <Field
                          type={typeof entry === "number" ? "number" : "text"}
                          name={`entries.${index}`}
                        />

                        <button
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          -
                        </button>

                        <ErrorMessage name={`entries.${index}`} />
                      </div>
                    ))
                  ) : (
                    <button>hehe</button>
                  )}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
