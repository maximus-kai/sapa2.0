import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
    const user = await currentUser();
    console.log(user);

    // check the current logged in clerk user 
    if (!user) {
        return null;
    }
    // check if the user is already in the database 
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserID: user.id
        }
    });

    // if user is in database, return user

    if (loggedInUser) {
        return loggedInUser;
    }

    // if not in database, create new user 
    const newUser = await db.user.create(
        {
            data: {
                clerkUserID: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageurl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            }
            
        }
    );
    return newUser;
}