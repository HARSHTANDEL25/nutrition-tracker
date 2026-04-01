"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const FIELDS = [
  {
    id: 1,
    name: "About You",
    data: [
      { name: "name", label: "Full name", type: "text" },
      { name: "birthYear", label: "Birth Year", type: "number" },
      {
        name: "sex",
        label: "Sex",
        type: "select",
        options: ["MALE", "FEMALE"],
      },
    ],
  },
  {
    id: 2,
    name: "Measurements",
    data: [
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
    ],
  },
  {
    id: 3,
    name: "Lifestyle & Goals",
    data: [
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
      {
        name: "dietPreference",
        label: "Diet Preference",
        type: "select",
        options: ["VEGETARIAN", "NON_VEGETARIAN", "VEGAN"],
      },
    ],
  },
];

const multistep = FIELDS.length;

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
  activityLevel: Yup.string().required("Required"),
  goal: Yup.string().required("Required"),
  deficitLevel: Yup.string().required("Required"),
  dietPreference: Yup.string().required("Required"),
});

export default function ProfilePage() {
  const [currentstep, Setcurrentstep] = useState(0);
  const router = useRouter();
  const IsNext = () => {
    if (currentstep < multistep - 1) {
      Setcurrentstep(currentstep + 1);
    }
  };
  const IsPrev = () => {
    if (currentstep > 0) {
      Setcurrentstep(currentstep - 1);
    }
  };
  const IsSubmit = () => {
    if (currentstep === multistep - 1) {
      return true;
    }
    return false;
  };
  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {/* Header section */}
        <div className="bg-emerald-500 p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight font-outfit text-white">
              {FIELDS[currentstep].name}
            </h1>
            <p className="mt-2 text-emerald-50 opacity-90 text-sm">
              Step {currentstep + 1} of {multistep} — Personalize your
              experience
            </p>
          </div>
          {/* Decorative bubble */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-zinc-100">
          <div
            className="h-full bg-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${((currentstep + 1) / multistep) * 100}%` }}
          ></div>
        </div>

        <Formik
          initialValues={{
            name: "",
            birthYear: "",
            sex: "MALE",
            height: "",
            heightUnit: "CM",
            weight: "",
            weightUnit: "KG",
            activityLevel: "",
            goal: "",
            deficitLevel: "",
            dietPreference: "",
          }}
          validationSchema={UserProfileSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (IsSubmit()) {
              try {
                const response = await fetch("/api/profile", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...values,
                    birthYear: Number(values.birthYear),
                    height: Number(values.height),
                    weight: Number(values.weight),
                  }),
                });
                if (response.ok) {
                  console.log("Profile created successfully");
                  router.push("/");
                }
              } catch (error) {
                console.log(error);
              } finally {
                setSubmitting(false);
              }
            } else {
              IsNext();
              setSubmitting(false);
            }
          }}
        >
          <Form className="p-8 space-y-6">
            {FIELDS[currentstep].data.map((field, index) => {
              return (
                <div key={index} className="space-y-1.5 w-full">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1"
                  >
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    name={field.name}
                    as={field.options ? "select" : "input"}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 text-zinc-900"
                  >
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-xs ml-1"
                  />
                </div>
              );
            })}

            <div className="flex gap-4 pt-4">
              {currentstep > 0 && (
                <button
                  type="button"
                  onClick={IsPrev}
                  className="flex-1 px-6 py-4 rounded-3xl border border-zinc-200 font-bold text-zinc-600 hover:bg-zinc-50 transition-all active:scale-[0.98]"
                >
                  Back
                </button>
              )}
              {IsSubmit() ? (
                <button
                  type="submit"
                  className="flex-[2] bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold py-4 rounded-3xl shadow-lg shadow-emerald-100 transition-all duration-200"
                >
                  Complete Profile
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-[2] bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold py-4 rounded-3xl shadow-lg shadow-emerald-100 transition-all duration-200"
                >
                  Next Step
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
