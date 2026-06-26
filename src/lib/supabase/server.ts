import { createServerClient as _c } from "@supabase/ssr";
import { cookies } from "next/headers";
export async function createServerClient() {
  const cookieStore = await cookies();
  return _c(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs: any) => { try { cs.forEach(({ name, value, options }: any) => cookieStore.set(name, value, options)); } catch {} } } }
  );
}
