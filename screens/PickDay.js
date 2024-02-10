import { Layout } from "@ui-kitten/components";
import * as React from "react";
import { Picker, PickerIOS } from "@react-native-picker/picker";

export default (props) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  return (
    <Layout style={{ marginTop: 100 }}>
      <PickerIOS
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <PickerIOS.Item label="Java" value="java" />
        <PickerIOS.Item label="JavaScript" value="js" />
      </PickerIOS>
    </Layout>
  );
};
