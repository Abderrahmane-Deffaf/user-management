"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFromSchema } from "../../schema/user-schema";
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
import { Button } from "@/components/ui/button";
import { addNewUser } from "../../api/add-new-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddNewUser() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(userFromSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      id: "2",
      role: "viewer",
    },
  });
  const onSubmit = async (data: Omit<User, "id">) => {
    const res = await addNewUser(data);
    if (typeof res === "string") {
      toast.error(res);
      return;
    }
    toast.success("User added successfully");
    form.reset(); // Reset the form after successful submission
    router.push("/users-list");
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your API or state management
  };
  return (
    <Form {...form}>
      <form
        className=" space-y-8"
        onSubmit={form.handleSubmit(onSubmit, (e) => {
          console.log(e);
        })}
      >
        {/* Form fields for adding a new user */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="id"
            render={({}) => (
              <FormItem className=" hidden">
                <FormLabel>id</FormLabel>
                <FormControl>
                  <Input placeholder="id" value={"3"} />
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
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <div className="flex gap-4">
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
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className=" basis-1/2">
                <FormLabel>Comment</FormLabel>
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
        </div>
        <Button disabled={form.formState.isSubmitting} type="submit">
          Add New User
        </Button>
      </form>
    </Form>
  );
}
