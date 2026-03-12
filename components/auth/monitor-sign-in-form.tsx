"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/field";
import { Input } from "@/shared/components/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useAuthenticateInstructorAccount } from "@/hooks/use-authenticate-instructor-account";

const monitorSignInFormValidationSchema = z.object({
  email: z.string().email("Digite um email válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
});

type MonitorSignInFormData = z.infer<typeof monitorSignInFormValidationSchema>;

export function MonitorSignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const authenticateInstructorAccount = useAuthenticateInstructorAccount();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MonitorSignInFormData>({
    resolver: zodResolver(monitorSignInFormValidationSchema),
  });

  async function handleMonitorSignIn(data: MonitorSignInFormData) {
    await authenticateInstructorAccount.execute(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleMonitorSignIn)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            Acesse com sua conta como Monitor
          </h1>
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
      </FieldGroup>
    </form>
  );
}
