import { html, raw } from "hono/html";
import { FC } from "hono/jsx";
import { SelectContact } from "../db/schema";

export const Contact: FC<{
  contacts: SelectContact[];
}> = ({ contacts }) => {
  return (
    <div class="py-3 sm:order-none order-3">
      <h2 class="text-lg font-poppins font-bold text-top-color">My Contact</h2>
      <div class="border-2 w-20 border-top-color my-3"></div>

      <div>
        {contacts.map((contact) => {
          return (
            <div class="flex items-center my-1">
              <a
                class="flex justify-center w-6 text-gray-700 hover:text-blue-900"
                href={
                  contact.navigation.includes("@gmail.com")
                    ? `mailto:${contact.navigation}`
                    : contact.navigation
                }
                target="_blank"
              >
                {html`${raw(contact.icon)}`}
              </a>
              <div class="ml-2 truncate">{contact.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;
