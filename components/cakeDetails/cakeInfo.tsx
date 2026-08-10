interface Props {
  name: string;
  price: number;
  description: string;
}

export default function CakeInfo({
  name,
  price,
  description,
}: Props) {
  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-[#4A2C1A]">
        {name}
      </h1>

      <p className="text-3xl font-bold text-[#C97B2A]">
        Rs. {price.toLocaleString()}
      </p>

      <p className="leading-8 text-gray-600">
        {description}
      </p>

    </div>
  );
}