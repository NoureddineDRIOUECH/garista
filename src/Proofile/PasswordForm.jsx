import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { toast } from "react-hot-toast";
import { axiosInstance } from '../../axiosInstance';

const formSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(1, 'New password is required'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine(({ confirmPassword, newPassword }) => confirmPassword === newPassword, {
  message: 'Confirm password does not match the new password',
  path: ['confirmPassword'],
});

export const PasswordForm = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const defaultValues = initialData ? {
    ...initialData,
  } : {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function ChangePassw(data) {
    setLoading(true);
    console.log("pass data ", data);
    try {
      const token = sessionStorage.getItem('tokenData');
      let tok = JSON.parse(token);
      const url = '/api/auth/changepassword';

      const res = await axiosInstance.post(url, {
        current_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      }, {
        headers: {
          Authorization: `Bearer ${tok.token}`
        }
      });

      if (res) {
        console.log('Password changed successfully', res.data);
        toast.success("Password changed successfully");
        form.reset();
      }

    } catch (err) {
      console.log("The Error => ", err);
      if (err.response && err.response.data) {
        form.setError("currentPassword", {
          type: "manual",
          message: err.response.data.message || "An error occurred",
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(ChangePassw)}>
        <div className="mt-4 mb-4 flex justify-center bg-white">
          <div className='w-full flex flex-col gap-5'>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password:</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={loading} className='my-3' placeholder='Enter current password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={loading} className='my-3' placeholder='Enter new password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-type New Password:</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={loading} className='my-3' placeholder='Re-enter new password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button className='my-3' type="submit" disabled={loading}>
                {loading ? 'Changing...' : 'Change password'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};