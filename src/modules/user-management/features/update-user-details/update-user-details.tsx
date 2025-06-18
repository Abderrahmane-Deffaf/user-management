"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFromSchema, UserFromType } from "../../schema/user-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "../../api/update-user";
import { toast } from "sonner";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import clsx from "clsx";

export function UpdateUserDetails({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const form = useForm<UserFromType>({
    resolver: zodResolver(userFromSchema),
    defaultValues: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      comment: user.comment,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: UserFromType) {
    const res = await updateUser(values);
    if (typeof res === "string") {
      toast.error(res);
      return;
    }
    toast.success("User updated");
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} key={user.id}>
      <DialogTrigger asChild>
        <TableRow className=" cursor-pointer">
          <TableCell className="font-medium">{user.id}</TableCell>
          <TableCell>
            {user.firstname} {user.lastname}
          </TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <span
              className={clsx("block py-1 text-white text-center  rounded-lg", {
                "bg-blue-600": user.role === "admin",
                "bg-indigo-800": user.role === "editor",
                "bg-gray-500": user.role === "viewer",
              })}
            >
              {user.role}
            </span>
          </TableCell>
          <TableCell>
            <span className="max-w-[40ch] line-clamp-1 truncate   ">
              {user.comment}
            </span>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] px-8 space-y-8">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user details here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className=" space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className=" basis-1/2">
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className=" basis-1/2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" flex gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className=" basis-1/2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className=" basis-1/2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" flex gap-4">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className=" basis-1/2">
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Comment"
                        className="resize-none max-h-28"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2  w-1/2">
                    <FormLabel className="h-fit">Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-full">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a role"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=" w-full">
                        {["admin", "editor", "viewer"].map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
