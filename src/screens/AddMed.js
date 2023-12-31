import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import uuid from 'react-uuid';
import moment from 'moment';

import {addMed} from '../redux/slices/medSlice';

const AddMed = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [horarioInicial, setHorarioInicial] = useState('');
  const [intervalo, setIntervalo] = useState('');
  const [quantidadeDoses, setQuantidadeDoses] = useState('');
  const [compartimento, setCompartimento] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const dispatch = useDispatch();

  const handleAddMedication = () => {
    const med = {
      id: uuid(),
      nome,
      horarioInicial,
      intervalo,
      quantidadeDoses,
      compartimento,
    };

    dispatch(addMed(med));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo medicamento</Text>

      <View style={{marginBottom: 10}}>
        <FloatingLabelInput
          value={nome}
          label="Nome"
          returnKeyType="done"
          onSubmit={() => {
            Keyboard.dismiss();
          }}
          onChangeText={setNome}
          containerStyles={{
            borderWidth: 1,
            borderColor: '#66b5ac',
            backgroundColor: '#DFDFDF',
            borderRadius: 5,
            height: 40,
          }}
          customLabelStyles={{
            leftFocused: 5,
            colorBlurred: '#605263',
            colorFocused: '#605263',
          }}
          labelStyles={{
            paddingHorizontal: 5,
          }}
          inputStyles={{
            height: 40,
            paddingHorizontal: 10,
            marginTop: 10,
            color: '#000',
          }}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={time => {
          setHorarioInicial(moment(time).format('HH:mm'));
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <TouchableOpacity
        style={[styles.input, {justifyContent: 'center'}]}
        onPress={() => setDatePickerVisibility(true)}>
        <Text style={{color: horarioInicial ? '#000' : '#605263'}}>
          {horarioInicial ? horarioInicial : 'Horário inicial'}
        </Text>
      </TouchableOpacity>

      <RNPickerSelect
        placeholder={{label: 'Intervalo entre doses', value: ''}}
        onValueChange={value => setIntervalo(value)}
        items={[
          {label: '4 em 4 horas', value: 4},
          {label: '6 em 6 horas', value: 6},
          {label: '8 em 8 horas', value: 8},
          {label: '12 em 12 horas', value: 12},
          {label: '24 em 24 horas', value: 24},
        ]}
        value={intervalo}
        useNativeAndroidPickerStyle={false}
        textInputProps={{
          height: 40,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#66b5ac',
          backgroundColor: '#DFDFDF',
          color: intervalo.length === 0 ? '#605263' : '#000',
        }}
      />

      <RNPickerSelect
        placeholder={{label: 'Quantidade de doses', value: ''}}
        onValueChange={value => setQuantidadeDoses(value)}
        items={[
          {label: '1', value: 1},
          {label: '2', value: 2},
          {label: '3', value: 3},
        ]}
        value={quantidadeDoses}
        useNativeAndroidPickerStyle={false}
        textInputProps={{
          height: 40,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#66b5ac',
          backgroundColor: '#DFDFDF',
          color: quantidadeDoses.length === 0 ? '#605263' : '#000',
        }}
      />

      <RNPickerSelect
        placeholder={{label: 'Compartimento', value: ''}}
        onValueChange={value => setCompartimento(value)}
        items={[
          {label: 'A', value: 1},
          {label: 'B', value: 2},
          {label: 'C', value: 3},
          {label: 'D', value: 4},
          {label: 'E', value: 5},
          {label: 'F', value: 6},
        ]}
        value={compartimento}
        useNativeAndroidPickerStyle={false}
        textInputProps={{
          height: 40,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#66b5ac',
          backgroundColor: '#DFDFDF',
          color: compartimento.length === 0 ? '#605263' : '#000',
        }}
      />
      <LinearGradient
        style={styles.addButtonContainer}
        colors={['#018576', '#1a9183', '#339d91']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMedication}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    backgroundColor: '#DFDFDF',
    borderWidth: 1,
    borderColor: '#66b5ac',
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  addButtonContainer: {
    marginTop: 15,
    height: 50,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#018576',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  addButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddMed;
