import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { FormLogin } from '../../../pages/login/components/organisms/form-login';
import styles from './login.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const onSubmit = $(() => {});

  return (
    <>
      <form class="w-1/2 flex flex-col gap-6 items-center">
        <FormLogin />
      </form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Boilerplate NX - Login',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
