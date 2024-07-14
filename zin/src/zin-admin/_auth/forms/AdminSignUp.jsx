import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAdminUser } from "../../lib/api/api";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/zin-admin/context/AdminAuthProvider";

const formSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.string().min(2).max(50),
});

const AdminSignUp = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setSignUp } = useAdminAuth();
  
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });
  
  async function onSubmit(values) {
    const data = await createAdminUser(values);
    if (data.success) {
      localStorage.setItem("Cookie", data.authToken);
      navigate("/admin");
      form.reset();
      setIsAuthenticated(true);
      setSignUp(false);
    }
  }

  
  return (
    <div className="bg-dark-3 min-h-[670px] w-[530px] rounded-md flex items-center justify-start flex-col mt-[50px] py-14 max-sm:w-[310px] ">
      <svg
        width="200"
        height="200"
        viewBox="0 0 52 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3555 69V0.559996H22.7955V69H12.3555ZM26.2755 69V0.559996H33.2355V69H26.2755ZM43.6755 69V0.559996H47.1555V69H43.6755ZM22.9115 103.916L36.3675 81.876H23.3755V79.092H39.9635V81.296L26.6235 103.336H38.8035C39.2675 103.336 39.6155 103.297 39.8475 103.22C40.0021 103.143 40.1955 103.027 40.4275 102.872H40.6595V106.004H22.9115V103.916Z"
          fill="#dda1d8"
        />
        <path
          d="M41.0525 103.05C41.0859 103.083 41.1025 103.25 41.1025 103.55C41.1025 103.817 41.1025 104.117 41.1025 104.45C41.1025 104.717 41.1025 105 41.1025 105.3C41.1359 105.567 41.1192 105.783 41.0525 105.95C40.9525 106.017 40.7859 106.033 40.5525 106C40.3525 105.967 40.1692 105.983 40.0025 106.05L34.6025 106.15H33.4025C33.1025 106.117 32.6192 106.1 31.9525 106.1C31.2859 106.133 30.8025 106.15 30.5025 106.15C30.2359 106.15 29.9525 106.15 29.6525 106.15C29.3859 106.183 29.1192 106.2 28.8525 106.2C28.2859 106.167 27.8692 106.133 27.6025 106.1C27.3359 106.067 26.9192 106.067 26.3525 106.1C25.9525 106.133 25.5525 106.167 25.1525 106.2C24.7859 106.233 24.4025 106.25 24.0025 106.25H21.8525C21.5859 106.25 21.2859 106.25 20.9525 106.25C20.6192 106.25 20.2192 106.267 19.7525 106.3C19.5859 106.233 19.2025 106.183 18.6025 106.15C18.0359 106.15 17.5359 106.15 17.1025 106.15C16.9359 106.183 16.7859 106.183 16.6525 106.15C16.5192 106.15 16.3692 106.15 16.2025 106.15C16.0692 105.983 15.9859 105.883 15.9525 105.85C15.9525 105.817 15.9525 105.733 15.9525 105.6C15.9525 105.333 15.9692 105.05 16.0025 104.75C16.0359 104.45 16.0359 104.167 16.0025 103.9C16.0025 103.733 15.9692 103.583 15.9025 103.45C15.8692 103.317 15.8525 103.217 15.8525 103.15C15.8525 103.117 15.9192 103.033 16.0525 102.9C16.1859 102.733 16.3359 102.567 16.5025 102.4C16.7025 102.2 16.9025 102.017 17.1025 101.85C17.3025 101.65 17.4859 101.5 17.6525 101.4L18.7525 100.2C19.1859 99.8 19.5692 99.3833 19.9025 98.95C20.2359 98.5167 20.6192 98.1 21.0525 97.7C21.4192 97.2667 21.8192 96.8 22.2525 96.3C22.7192 95.7667 23.1525 95.3 23.5525 94.9L25.1525 92.8L27.6025 90.1C27.7692 89.9333 27.9692 89.6833 28.2025 89.35C28.4692 89.0167 28.6525 88.75 28.7525 88.55C28.7859 88.4833 28.8859 88.35 29.0525 88.15C29.2525 87.9167 29.4359 87.6833 29.6025 87.45C29.8025 87.1833 29.9859 86.9333 30.1525 86.7C30.3192 86.4667 30.4192 86.3167 30.4525 86.25C30.4859 86.2167 30.6025 86.05 30.8025 85.75C31.0359 85.45 31.2692 85.1333 31.5025 84.8C31.7692 84.4667 32.0025 84.1667 32.2025 83.9C32.4359 83.6 32.5692 83.4167 32.6025 83.35L32.9025 82.7C32.9025 82.5333 32.8192 82.4667 32.6525 82.5C32.5192 82.5 32.4025 82.5 32.3025 82.5C31.8359 82.5 31.4025 82.5167 31.0025 82.55C30.6025 82.55 30.1692 82.55 29.7025 82.55C29.0359 82.55 28.4025 82.55 27.8025 82.55C27.2025 82.5167 26.6192 82.5 26.0525 82.5H20.7525C20.6859 82.5 20.6359 82.4833 20.6025 82.45C20.5025 82.4167 20.4525 82.35 20.4525 82.25C20.5525 81.8167 20.5692 81.35 20.5025 80.85C20.4359 80.35 20.4025 79.8833 20.4025 79.45C20.4025 79.1833 20.5525 79.05 20.8525 79.05H22.5025C22.7359 79.05 23.0525 79.05 23.4525 79.05C23.8525 79.0167 24.2692 79 24.7025 79C25.1359 79 25.5525 79 25.9525 79C26.3525 78.9667 26.6859 78.95 26.9525 78.95C27.2525 78.95 27.5525 78.9333 27.8525 78.9C28.1859 78.8333 28.5025 78.8167 28.8025 78.85C29.0692 78.85 29.3359 78.85 29.6025 78.85C29.9025 78.85 30.1859 78.8667 30.4525 78.9C30.9192 78.9 31.4025 78.9167 31.9025 78.95C32.4025 78.9833 32.9025 78.9833 33.4025 78.95C33.4692 78.95 33.5692 78.9667 33.7025 79C33.8692 79 33.9859 79 34.0525 79C34.5525 79.1 35.0525 79.1333 35.5525 79.1C36.0859 79.0667 36.6025 79.05 37.1025 79.05C37.4692 79.0833 37.8692 79.0833 38.3025 79.05C38.7359 79.0167 39.0692 79.0333 39.3025 79.1C39.6359 79.1667 39.9025 79.1833 40.1025 79.15C40.3025 79.1167 40.4859 79.1 40.6525 79.1H40.9025C40.9359 79.1333 40.9859 79.3 41.0525 79.6V82.4C40.7859 82.7 40.5859 82.9667 40.4525 83.2C40.3192 83.4 40.0859 83.6333 39.7525 83.9C39.6859 83.9667 39.4859 84.2167 39.1525 84.65C38.8525 85.0833 38.4859 85.5833 38.0525 86.15C37.6192 86.6833 37.1692 87.2333 36.7025 87.8C36.2692 88.3667 35.9192 88.85 35.6525 89.25C35.5525 89.4167 35.3525 89.6667 35.0525 90C34.7859 90.3333 34.4859 90.7 34.1525 91.1C33.8525 91.4667 33.5692 91.8333 33.3025 92.2C33.0359 92.5333 32.8525 92.7667 32.7525 92.9C32.3859 93.5333 31.9859 94.1333 31.5525 94.7C31.1192 95.2333 30.6859 95.7833 30.2525 96.35C29.9859 96.6167 29.7192 96.8833 29.4525 97.15C29.1859 97.4167 28.9192 97.6833 28.6525 97.95C28.4525 98.2167 28.2525 98.5 28.0525 98.8C27.8859 99.0667 27.7025 99.3333 27.5025 99.6C27.1025 100.067 26.7192 100.55 26.3525 101.05C26.0192 101.55 25.6692 101.983 25.3025 102.35C25.5692 102.417 25.8859 102.467 26.2525 102.5C26.6525 102.533 26.8859 102.533 26.9525 102.5C27.1192 102.433 27.3025 102.433 27.5025 102.5C27.9692 102.533 28.5192 102.583 29.1525 102.65C29.8192 102.717 30.3859 102.767 30.8525 102.8C31.2192 102.833 31.6525 102.85 32.1525 102.85C32.6525 102.85 33.0859 102.85 33.4525 102.85H33.9025C34.3692 102.883 34.8025 102.933 35.2025 103C35.6025 103.067 36.0359 103.067 36.5025 103C36.7692 102.967 37.0525 102.967 37.3525 103C37.6525 103 37.9359 103.017 38.2025 103.05H38.5025C38.9025 103.05 39.2025 103.05 39.4025 103.05C39.6359 103.017 39.9525 103 40.3525 103C40.4859 103 40.6359 103 40.8025 103C40.9692 103 41.0525 103.017 41.0525 103.05Z"
          fill="#dda1d8"
        />
      </svg>

      <h2 className="text-3xl font-bold text-pink-200 m-5">Admin Sign-Up</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[450px] flex flex-col text-pink-200 max-sm:w-[280px] "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="bg-dark-2 text-light-2 border-none  "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="bg-dark-2 text-light-2 border-none  "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    className="bg-dark-2 text-light-2 border-none  "
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
            render={() => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Controller
                    name="role"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="bg-dark-2 border-none">
                          <SelectValue placeholder="Choose your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="bg-zinc-800 text-light-2 focus:bg-zinc-900 focus:text-light-2"
                            value="admin"
                          >
                            Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-1/4 mx-auto hover:bg-zinc-700 text-pink-200"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminSignUp;
