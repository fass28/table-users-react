import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDialog, useEditUser } from "@/store/user"
import { toast } from "@/hooks/use-toast"
import { useUser } from "@/hooks/use-user"
import { Loader2 } from "lucide-react"

type UserFormDialogProps = {
  onSuccess: () => void
}

export const UserFormDialog = ({ onSuccess }: UserFormDialogProps) => {
  const { getUser } = useEditUser()
  const { isDialogOpen,closeDialog } = useDialog()
  const { id, userName, email, name, lastNameFather, lastNameMother } = getUser()
  const { updateUserById, isLoadingUpdate } = useUser();

  const formSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, { message: 'El nombre debe tener almenos 2 caracteres' }).max(15, { message: 'El nombre debe tener menos de 15 caracteres' }),
    lastNameFather: z.string().min(2, { message: 'El Apellido paterno debe tener almenos 2 caracteres' }).max(15, { message: 'El Apellido paterno debe tener menos de 15 caracteres' }),
    lastNameMother: z.string().min(2, { message: 'El Apellido materno debe tener almenos 2 caracteres' }).max(15, { message: 'El Apellido materno debe tener menos de 15 caracteres' }),
    userName: z.string().min(3, { message: 'El usuario debe tener almenos 3 caractres' }).max(15, { message: 'El usuario debe tener menos de 15 caracteres' }),
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      id,
      userName,
      email,
      name,
      lastNameFather,
      lastNameMother,
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateUserById(id, values);
      toast({
        title: 'Usuario Actualizado',
        description: `Usuario con ID: ${id} ha sido Correctamente Atualizado`,
        duration: 5000,
      })
      onSuccess()
    } catch (error) {
      toast({
        title: 'Error al Actualizar',
        description: `Usuario con ID: ${id} no ha sido Actualizado con error: ${error}`,
        duration: 5000,
        variant: 'destructive',
      })
    }
    closeDialog()
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User {id}</DialogTitle>
            <DialogDescription>
              Make changes to the user here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <div className="grid gap-4 py-4">
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>


                    </div>
                    <DialogFooter>
                    </DialogFooter>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="lastNameFather"
                render={({ field }) => (
                  <>
                    <div className="grid gap-4 py-4">
                      <FormItem>
                        <FormLabel>Father's Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="lastNameFather" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>


                    </div>
                    <DialogFooter>
                    </DialogFooter>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="lastNameMother"
                render={({ field }) => (
                  <>
                    <div className="grid gap-4 py-4">
                      <FormItem>
                        <FormLabel>Mother's Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="lastNameMother" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>


                    </div>
                    <DialogFooter>
                    </DialogFooter>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <div className="grid gap-4 py-4">
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>


                    </div>
                    <DialogFooter>
                    </DialogFooter>
                  </>
                )}
              />
              <Button type="submit">
                  {isLoadingUpdate ? <Loader2 className="animate-spin" /> : 'Save changes'}
              </Button>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}