"use server"

import { revalidatePath } from "next/cache";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import bcrypt from "bcryptjs";

export const addPost = async (previousState, formData) => {

  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    
  } catch (error) {
    console.log(error);
    return { error: 'Something wrong'}
  }

}

export const deletePost = async (formData) => {
  // "use server"

  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    
  } catch (error) {
    console.log(error);
    return { error: 'Something wrong'}
  }

}

export const addUser = async (previousState,formData) => {

  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
    
  } catch (error) {
    console.log(error);
    return { error: 'Something wrong'}
  }

}


export const deleteUser = async (formData) => {

  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id})
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
    
  } catch (error) {
    console.log(error);
    return { error: 'Something wrong'}
  }

}


export  const handleGithubLogin = async () => {
    "use server"

    await signIn("github");
  };

  export  const handleLogout = async () => {
    "use server"

    await signOut();
  };

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return {error: 'Password do not match'};
  }

  try {
    connectToDb();

    const user = await User.findOne({username});

    if (user) return {error: "User already exist"};

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword);

    const newUser = User({
      username, 
      email,
      password: hashedPassword,
      img
    });
    console.log(newUser);

    await newUser.save();
    console.log('save to db')

    return { success: true};
  } catch (error) {
    console.log(error);
    return
  }
}

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });

  } catch (error) {
    // console.log(error);

    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password"}
    }
    throw error;
  }
}