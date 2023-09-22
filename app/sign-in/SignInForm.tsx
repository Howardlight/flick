"use client";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import * as Yup from "yup";

const SignInSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
});

const initialValue = {
    username: "",
    password: ""
}

const BtnBaseStyles = "transition duration-150 ease-in-out p-2 rounded-sm shadow-sm bg-red-500 text-neutral-100 hover:bg-red-600 h-12";

export default function SignInForm() {
    let callbackUrl = "/";
    const searchParams = useSearchParams();
    if (searchParams) callbackUrl = searchParams.get("callbackUrl") != null ? searchParams.get("callbackUrl") as string : "/";
    const router = useRouter();

    return (
        <Fragment>
            <Formik
                initialValues={initialValue}
                validationSchema={SignInSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    const response = await signIn("credentials", { redirect: false, username: values.username, password: values.password })
                    if (response?.ok && response.status == 200) router.push(callbackUrl);
                    setSubmitting(false);
                    console.log(response);
                    //TODO: On certain instances, loading takes time and the user could still access the interface, fix that
                }}
            >
                {formik => (
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col mb-10 max-w-lg"
                    >
                        <div className="flex flex-col mb-5">
                            <label className="text-base mb-2 font-semibold" htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="p-2 rounded-sm"
                                {...formik.getFieldProps("username")}
                            />
                            {formik.touched.username && formik.errors.username ?
                                <p className="mt-1 text-red-600 text-sm font-medium">{formik.errors.username}</p>
                                : <Fragment />
                            }
                        </div>


                        <div className="flex flex-col mb-5">
                            <label className="text-base font-semibold mb-2" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="p-2 rounded-sm"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <p className="mt-1 text-red-600 text-sm font-medium">{formik.errors.password}</p>
                                : <Fragment />
                            }
                        </div>

                        <button
                            className={[formik.isSubmitting ? "disabled:bg-red-600 cursor-not-allowed" : "", BtnBaseStyles].join(" ")}
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            <ButtonContent isSubmitting={formik.isSubmitting} />
                        </button>
                    </form>
                )}
            </Formik>
            <Register />

        </Fragment>
    )
}

function ButtonContent({ isSubmitting }: { isSubmitting: boolean }) {
    if (isSubmitting) return (
        <div className="inline-flex flex-row items-center justify-center gap-2 pt-1">
            <IconLoader2 className="animate-spin" />
            <p>Signing in</p>
        </div>
    )
    return <p className="inline-flex">Sign in</p>;
}

function Register() {
    return (
        <div className="inline-flex flex-row text-sm text-neutral-400 gap-1">
            <p className="">Not a member? </p>
            <Link className="hover:text-neutral-200 underline" href="https://www.themoviedb.org/signup">Sign up with TMDB™</Link>
        </div>
    )
}