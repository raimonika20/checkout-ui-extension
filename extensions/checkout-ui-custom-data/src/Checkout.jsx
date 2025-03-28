import { useEffect, useState } from "react";
import {
  useCartLineTarget,
  Text,
  useAppMetafields,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

// Set the entry points for the extension (Order Status Page)
export default reactExtension("purchase.thank-you.block.render", () => <App />);

function App() {
  // Fetch snowboard specifications metafields
  const snowboardMetafields = useAppMetafields({
    type: "product",
    namespace: "custom",
    key: "snowboard_specifications"
  });

  const cartLineTarget = useCartLineTarget();
  const [snowboardSpecs, setSnowboardSpecs] = useState("");

  useEffect(() => {
    // Get the product ID from the order line item
    const productId = cartLineTarget?.merchandise?.product?.id;
    if (!productId) {
      return;
    }

    // Find the metafield that matches the product
    const snowboardMetafield = snowboardMetafields.find(({ target }) => {
      return `gid://shopify/Product/${target.id}` === productId;
    });

    // If metafield exists, update state with snowboard specifications
    if (typeof snowboardMetafield?.metafield?.value === "string") {
      setSnowboardSpecs(snowboardMetafield.metafield.value);
    }
  }, [cartLineTarget, snowboardMetafields]);

  // Render snowboard specifications if available
  if (snowboardSpecs) {
    return (
      <div>
        <Text>Snowboard Specifications:</Text>
        <Text>{snowboardSpecs}</Text>
      </div>
    );
  }

  return null;
}
