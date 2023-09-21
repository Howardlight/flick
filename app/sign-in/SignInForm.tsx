"use client";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

export default function SignInForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams!.get("callbackUrl") || "/profile";
    const router = useRouter();

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
                username: Yup.string().required("Required"),
                password: Yup.string().required("Required")
            })}
            onSubmit={async (values, { setSubmitting }) => {
                const response = await signIn("credentials", { redirect: false, username: values.username, password: values.password })
                setSubmitting(false);
                console.log(response);
                if (response?.ok && response.status == 200) router.push(callbackUrl);
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit} className="flex flex-col">
                    <div className="flex flex-col mb-5">
                        <label className="text-xl mb-2" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="p-3 rounded-sm"
                            {...formik.getFieldProps("username")}
                        />
                        {formik.touched.username && formik.errors.username ?
                            (<div>{formik.errors.username}</div>)
                            : null
                        }
                    </div>


                    <div className="flex flex-col mb-5">
                        <label className="text-xl mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="p-3 rounded-sm"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ?
                            (<div>{formik.errors.password}</div>)
                            : null
                        }
                    </div>

                    <button className="transition duration-150 ease-in-out p-3 rounded-sm shadow-sm bg-red-500 text-neutral-100 hover:bg-red-600" type="submit">Sign in</button>
                </form>
            )}
        </Formik>
    )
}