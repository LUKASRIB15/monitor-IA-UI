"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/shared/components/field";
import { Input } from "@/shared/components/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useAuthenticateStudentAccount } from "@/hooks/use-authenticate-student-account";
import { CircleUserRound } from "lucide-react";

const signInFormValidationSchema = z.object({
  email: z.string().email("Digite um email válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
});

type SignInFormData = z.infer<typeof signInFormValidationSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const authenticateStudentAccount = useAuthenticateStudentAccount();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormValidationSchema),
  });

  async function handleSignIn(data: SignInFormData) {
    await authenticateStudentAccount.execute(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Acesse com sua conta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <div className="flex flex-col gap-2">
            <Input
              id="email"
              type="email"
              placeholder="user@email.com"
              className={clsx(
                errors.email &&
                  "border-destructive focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-destructive/50",
              )}
              {...register("email")}
            />
            {errors.email && (
              <FieldDescription className="text-destructive text-xs">
                {errors.email.message}
              </FieldDescription>
            )}
          </div>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              id="password"
              type="password"
              className={clsx(
                errors.password &&
                  "border-destructive focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-destructive/50",
              )}
              {...register("password")}
            />
            {errors.password && (
              <FieldDescription className="text-destructive text-xs">
                {errors.password.message}
              </FieldDescription>
            )}
          </div>
        </Field>
        <Field>
          <Button type="submit">
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
              </div>
            ) : (
              "Entrar"
            )}
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Não tem uma conta?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Cadastrar-se
          </Link>
        </FieldDescription>
        <FieldSeparator>Ou continue com</FieldSeparator>
        <Field>
          <Button asChild>
            <Link href={"/monitor/sign-in"}>
              <CircleUserRound />
              Sou monitor
            </Link>
          </Button>
        </Field>
        <Field>
          {/* <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button> */}
        </Field>
      </FieldGroup>
    </form>
  );
}
