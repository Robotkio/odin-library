# odin-library
The library assignment from the Odin Project used to practice prototyping and vague, OOP practice.

https://robotkio.github.io/odin-library/

Major failing so far: 
- It redraws the whole list of books when you check or uncheck the "read" icon.
- I can't tell what element is causing the width of the drawing frame to expand so I get a horizontal scroll bar sometimes.

Update after Classes Lesson

- It was surprisingly easy to update. I decided to make both "Book" and "Library" into a class and then wrap all the other functions into a single object called "libraryFunc" that can keep some of the functions hidden from public and avoid namespace issues. I could see it making sense to wrap both the Library and Book classes inside of that but I'm not sure.

- I also decided to make the Book classes fields private, just with getters, because it's really just a data class anyway so I don't think it needs setters.

- The Library class is kind of redundant because it's just a wrapper around an array.

- I don't know if I needed to put _ in front of private fields and functions inside libraryFunc but I did anyway.

- Pretty happy with it overall. Still has the same major failings. That's for another day.