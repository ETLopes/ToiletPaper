/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Picker, ScrollView} from 'react-native';
import {TextInput, Divider, Appbar} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      size: 0,
    };
  }

  calculation(value, size, quantity) {
    if (size === 0) {
      return 0;
    }
    const convertedValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    return (((convertedValue / size) * quantity) / 100).toFixed(2);
  }

  render() {
    const volumes = [
      {recipient: '24 rolos', quantity: 24},
      {recipient: '16 rolos', quantity: 16},
      {recipient: '12 rolos', quantity: 12},
      {recipient: '8 rolos', quantity: 8},
      {recipient: '4 rolos', quantity: 4},
    ];

    return (
      <View style={styles.page}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Conversor de Papel Higiênico" />
        </Appbar.Header>
        <View style={styles.body}>
          <Text>Digite o preço do papel higiênico:</Text>
          <TextInputMask
            label={'preço'}
            type={'money'}
            value={this.state.value}
            onChangeText={value => {
              this.setState({
                value,
              });
            }}
            ref={ref => (this.moneyField = ref)}
            style={styles.valueInput}
          />
          <Text>Escolha o tamanho do pacote:</Text>
          <Picker
            selectedValue={this.state.size}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({size: itemValue})
            }
            style={styles.pickerStyle}>
            <Picker.Item label="Escolha um tamanho" value={0} />

            {volumes.map((volume, index) => (
              <Picker.Item
                key={index}
                label={volume.recipient}
                value={volume.quantity}
              />
            ))}
          </Picker>
          <Divider />
          <View style={styles.valuesArea}>
            {volumes.map((volume, index) => (
              <View style={styles.valueDisplayBox} key={index}>
                <TextInput
                  key={index}
                  style={styles.valueDisplay}
                  mode="outlined"
                  label={volume.recipient}
                  value={this.calculation(
                    this.state.value,
                    this.state.size,
                    volume.quantity,
                  )}
                  disabled
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    elevation: 4,
  },
  body: {
    flex: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  valueInput: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  pickerStyle: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#EEEEEE',
  },
  valuesArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueDisplayBox: {
    width: '48%',
    marginLeft: 5,
  },
  valueDisplay: {
    marginTop: 15,
    color: 'black',
  },
});

export default App;
