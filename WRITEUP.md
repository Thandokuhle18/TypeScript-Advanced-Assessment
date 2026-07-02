WRITEUP
1. What does a generic constraint (K extends keyof T) buy you over any?

A generic constraint makes sure the key exists in the object obj. The TypeScript compiler checks this at compile time. Using any removes these safety checks and allows mistakes that could cause runtime errors.

2. When would you use a mapped type vs a utility type like Pick?

Use utility types (like Pick) for quick, standard tasks like choosing, hiding, or making fields optional from an existing model. Use mapped types when you need to build your own custom rules, such as changing field names, adding prefixes, or altering the types of values inside an object.

3. What is the difference between unknown and any, and why is a type guard safer than a cast?

Any turns off type-checking, letting you use a variable without restrictions, which can cause runtime crashes. Unknown is the safe alternative that forces you to verify what the value is before you can use it.
Type guard ensures that your code is robust and preventing unexpected runtime bugs or crashes.

4. How does the never exhaustiveness check in the reducer protect you?

Catches Forgotten Branches: If you add a new action to your union type but forget to add its case block in the switch statement, the code will immediately fail to compile.

Throws a Compile-Time Error: The unhandled action falls into the default branch, where TypeScript flags an error because the new action cannot be assigned to the never type.

Prevents Drifting and Bugs: It turns the missing logic into a "red squiggle" in your editor before the code ever runs, ensuring your code and types never drift apart.

