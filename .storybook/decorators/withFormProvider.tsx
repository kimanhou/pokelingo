import { FormProvider, useForm } from 'react-hook-form';

export function withFormProvider(Story) {
  const methods = useForm({ mode: 'onChange' });

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Story />
      </form>
    </FormProvider>
  );
}
