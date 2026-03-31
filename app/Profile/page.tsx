"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const FIELDS = [
  { name: "name", label: "Full name", type: "text" },
  { name: "birthYear", label: "Birth Year", type: "number" },
  { name: "sex", label: "Sex", type: "select", options: ["MALE", "FEMALE"] },
  { name: "height", label: "Height", type: "number" },
  {
    name: "heightUnit",
    label: "Height Unit",
    type: "select",
    options: ["CM", "INCH"],
  },
  { name: "weight", label: "Weight", type: "number" },
  {
    name: "weightUnit",
    label: "Weight Unit",
    type: "select",
    options: ["KG", "LB"],
  },
  {
    name: "activityLevel",
    label: "Activity Level",
    type: "select",
    options: ["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "VERY_ACTIVE"],
  },
  {
    name: "goal",
    label: "Goal",
    type: "select",
    options: ["LOSE", "MAINTAIN", "GAIN"],
  },
  {
    name: "deficitLevel",
    label: "Deficit Level",
    type: "select",
    options: ["LOW", "MEDIUM", "EXTREME"],
  },
];

const UserProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short").required("Required"),
  birthYear: Yup.number()
    .min(1920)
    .max(new Date().getFullYear())
    .required("Required"),
  sex: Yup.string().oneOf(["MALE", "FEMALE"]).required("Required"),
  height: Yup.number().positive().required("Required"),
  heightUnit: Yup.string().oneOf(["CM", "INCH"]).required("Required"),
  weight: Yup.number().positive().required("Required"),
  weightUnit: Yup.string().oneOf(["KG", "LB"]).required("Required"),
  activityLevel: Yup.string()
    .oneOf(["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "VERY_ACTIVE"])
    .required("Required"),
  goal: Yup.string().oneOf(["LOSE", "MAINTAIN", "GAIN"]).required("Required"),
  deficitLevel: Yup.string()
    .oneOf(["LOW", "MEDIUM", "EXTREME"])
    .required("Required"),
});

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="bg-emerald-500 p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
            <p className="mt-2 text-emerald-50 opacity-90 text-sm">
              Enter your details to calculate precise daily targets
            </p>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <Formik
          initialValues={{
            name: "",
            birthYear: "",
            sex: "MALE",
            height: 170,
            heightUnit: "CM",
            weight: 70,
            weightUnit: "KG",
            activityLevel: "MODERATE",
            goal: "MAINTAIN",
            deficitLevel: "MEDIUM",
          }}
          validationSchema={UserProfileSchema}
          onSubmit={(values) => {
            console.log("Saving to Database...", values);
          }}
        >
          <Form className="p-8 space-y-6">
            {FIELDS.map((field, index) => {
              if (field.name === "weightUnit" || field.name === "heightUnit")
                return null;

              const isUnitField =
                field.name === "weight" || field.name === "height";

              // Find the options for the companion unit field
              const companionUnitName =
                field.name === "weight" ? "weightUnit" : "heightUnit";
              const companionField = isUnitField
                ? FIELDS.find((f) => f.name === companionUnitName)
                : null;

              return (
                <div key={index} className="space-y-1.5 w-full">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">
                    {field.label}
                  </label>

                  <div className={isUnitField ? "flex gap-3" : "block"}>
                    <Field
                      name={field.name}
                      as={field?.options ? "select" : "input"}
                      type={field.type}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                    >
                      {field?.options?.map((option: any, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>

                    {isUnitField && companionField && (
                      <Field
                        name={companionField.name}
                        as="select"
                        className="w-28 px-4 py-3.5 rounded-2xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer text-center font-semibold"
                      >
                        {companionField.options?.map((option: any, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                    )}
                  </div>

                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-xs ml-1"
                  />
                  {isUnitField && (
                    <ErrorMessage
                      name={companionUnitName}
                      component="div"
                      className="text-red-500 text-xs ml-1"
                    />
                  )}
                </div>
              );
            })}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold py-4 rounded-3xl shadow-lg shadow-emerald-100 transition-all duration-200 cursor-pointer mt-4"
            >
              Save & Continue
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
