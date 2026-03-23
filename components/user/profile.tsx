import { IconUserCircle } from "@tabler/icons-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/shared/components/dialog";
import { DropdownMenuItem } from "@/shared/components/dropdown-menu";
import { Avatar, AvatarFallback } from "@/shared/components/avatar";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/field";
import { Input } from "@/shared/components/input";
import { Button } from "@/shared/components/button";
import { Separator } from "@/shared/components/separator";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteProfile } from "./delete-profile";
import { type UserDTO } from "@/store/auth";
import { useEditUserAccount } from "@/hooks/use-edit-user-account";

const profileFormValidationSchema = z.object({
  name: z.string(),
});

type ProfileFormData = z.infer<typeof profileFormValidationSchema>;

type ProfileProps = {
  user: UserDTO;
};

export function Profile({ user }: ProfileProps) {
  const editUserAccount = useEditUserAccount();

  const { handleSubmit, register, watch } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormValidationSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const isUnnecessaryEditProfile = watch("name").trim() === user.name;

  async function handleEditProfile(data: ProfileFormData) {
    await editUserAccount.execute(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <IconUserCircle />
          Minha Conta
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden p-0 sm:max-w-3xl"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader className="bg-accent/60 h-30 w-full relative">
          <Avatar className="h-25 w-25 rounded-full absolute left-1/2 -translate-x-1/2 -bottom-1/3 border border-primary">
            <AvatarFallback className="rounded-lg text-5xl"></AvatarFallback>
          </Avatar>
        </DialogHeader>
        <main className="flex flex-col">
          <div className="flex flex-col gap-2 items-center p-10">
            <DialogTitle className="block">{user.name}</DialogTitle>
          </div>
          <Separator />
          <form onSubmit={handleSubmit(handleEditProfile)} className="p-10 ">
            <FieldGroup>
              <div className="flex items-center gap-1">
                <IconUserCircle />
                <p className="text-lg leading-none font-semibold">
                  Meus Dados Pessoais
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Field>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Digite seu nome"
                    {...register("name")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    disabled
                    value={user.email}
                  />
                </Field>
              </div>
              <div className="flex items-center gap-4 justify-end">
                <DeleteProfile />
                <Button type="submit" disabled={isUnnecessaryEditProfile}>
                  {editUserAccount.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-3 border-muted-foreground border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : (
                    "Editar minha conta"
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </main>
      </DialogContent>
    </Dialog>
  );
}
