import { supabase } from "../..";

export class AuthService {
  public async signIn(email: string, password: string) {
    await supabase.auth.signInWithPassword({ email, password });
    return { message: "Login successful" };
  }

  public async signUp(email: string, password: string) {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:4200/home",
      },
    });
    return { message: "Registration successful" };
  }

  public async signOut() {
    await supabase.auth.signOut();
    return { message: "Logout successful" };
  }
}
