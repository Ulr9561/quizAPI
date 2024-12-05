import bcrypt from "bcrypt";
const saltRounds = 10;
class Hash {
    public static async hash(password: string): Promise<string> {
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            return hash;
        } catch (e) {
            console.error("Error hashing password:", e);
            throw new Error("Error hashing password");
        }
    }

    public static async verify(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            return isMatch;
        } catch (err) {
            console.error("Error verifying password:", err);
            throw new Error("Password does not match");
        }
    }
}

export default Hash;
