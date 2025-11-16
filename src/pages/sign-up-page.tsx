import { Button, Input } from "@/components/ui";
import { useUsignUp } from "@/hooks/mutations/use-sign-up";
import { useState } from "react";
import { Link } from "react-router";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp } = useUsignUp();

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입55</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          type="email"
          placeholder="example@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button className="w-full" onClick={handleSignUpClick}>
          회원가입
        </Button>
      </div>
      <div>
        <Link to={"/sign-in"} className="text-muted-foreground hover:underline">
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
