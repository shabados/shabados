import { $ } from '@builder.io/qwik';

const handleJump = $((source: string, max: number) => {
  const number = parseInt(
    window!.prompt(`Please input a number between 1 and ${max}`)!,
  );
  if (!isNaN(number) && isFinite(number)) {
    if (number <= max && number >= 1) {
      window.location.href = `/${source}/${number}`;
    } else window.alert(`Number must be between 1 and ${max}`);
  } else window.alert('Invalid number');
});

export default handleJump;
