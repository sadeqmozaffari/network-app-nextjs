'use server';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '../lib/auth';

const UpdateUserSchema = z.object({
  jobTitle: z.string().min(3),
  bio: z.string(),
});

export interface UpdateUserState {
  errors?: {
    jobTitle?: string[];
    bio?: string[];
  };
  message?: string;
  success?: string;
}

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
  const session = await auth();
  const jobTitle = formData.get('jobTitle');
  const bio = formData.get('bio');

  const validatedFields = UpdateUserSchema.safeParse({
    jobTitle: jobTitle,
    bio: bio,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Update user error',
    };
  }

  await prisma.user.update({
    where: { id: session?.user.id },
    data: {
      jobTitle: validatedFields.data.jobTitle,
      bio: validatedFields.data.bio,
    },
  });

  return {
    success: 'Update user success',
  };
}

const UpdateSkillRatingSchema = z.object({
  skillId: z.string().uuid(),
  rating: z.number().min(1).max(5),
});

interface UpdateSkillRatingState {
  errors?: {
    skillId?: string[];
    rating?: string[];
  };
  message?: string;
  success?: string;
}

export async function updateSkillRating(
  prevState: UpdateSkillRatingState,
  formData: FormData
): Promise<UpdateSkillRatingState> {
  const session = await auth();

  const validatedFields = UpdateSkillRatingSchema.safeParse({
    skillId: formData.get('skillId'),
    rating: parseInt(formData.get('rating')?.toString()!),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Update skill error',
    };
  }

  await prisma.usersToSkills.updateMany({
    where: {
      skillId: validatedFields.data.skillId,
      userId: session?.user.id,
    },
    data: { rating: validatedFields.data.rating },
  });

  revalidatePath('/dashboard/profile/skills');

  return {
    success: 'Update skill success',
  };
}

const AddUsersToSkillsSchema = z.object({
  skillId: z.string().uuid(),
  rating: z.number().min(1).max(5),
});

export interface AddUsersToSkillsState {
  errors?: {
    skillId?: string[];
    rating?: string[];
  };
  message?: string;
  success?: string;
}

export async function addUsersToSkills(
  prevState: AddUsersToSkillsState,
  formData: FormData
): Promise<AddUsersToSkillsState> {
  const session = await auth();

  const validatedFields = AddUsersToSkillsSchema.safeParse({
    skillId: formData.get('skillId'),
    rating: parseInt(formData.get('rating')?.toString()!),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'An error occurred',
    };
  }

  const userToSkill = await prisma.usersToSkills.findFirst({
    where: {
      skillId: validatedFields.data.skillId,
      userId: session?.user.id,
    },
  });

  if (userToSkill) {
    return {
      message: 'Rating for this skill already exists',
    };
  }

  await prisma.usersToSkills.create({
    data: {
      skillId: validatedFields.data.skillId,
      userId: session?.user.id!,
      rating: validatedFields.data.rating,
    },
  });

  revalidatePath('/dashboard/profile/skills');
  return {
    success: 'User to skill created',
  };
}

export async function deleteUserToSkill(skillId: string) {
  const session = await auth();
  await prisma.usersToSkills.deleteMany({
    where: {
      id: skillId,
      userId: session?.user.id,
    },
  });
  revalidatePath('/dashboard/profile/skills');
}
