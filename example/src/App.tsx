import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import {
  getUser,
  getServices,
  createService,
  cancelService,
  init,
} from '../../src/services/Api';
import type {
  CreateServiceRequest,
  ServiceRequest,
  User,
  RequestServiceResponse,
} from './types/Types';

export default function App() {
  const [userData, setUserData] = useState<User | null>(null);
  const [services, setServices] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [requestedService, setRequestedService] =
    useState<RequestServiceResponse | null>(null);
  const [showRequestFormId, setShowRequestFormId] = useState<number | null>(
    null
  );

  const [serviceId, setServiceId] = useState('');
  const [addOnId, setAddOnId] = useState('');
  const [pickUpLat, setPickUpLat] = useState('');
  const [pickUpLong, setPickUpLong] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');

  useEffect(() => {
    init({
      token: 'YOUR_TOKEN',
      baseUrl: 'YOUR_BASE_URL/api/',
      language: 'ar',
    });
    fetchAll();
  }, []);

  const fetchAll = () => {
    setLoading(true);
    Promise.all([fetchUser(), fetchServices()]).finally(() =>
      setLoading(false)
    );
  };

  const fetchUser = () => {
    return getUser()
      .then((res) => {
        setUserData(res.data);
      })
      .catch(() => setUserData(null));
  };

  const fetchServices = () => {
    return getServices().then((res) => {
      setServices(res?.data || []);
    });
  };

  const openRequestForm = (service: ServiceRequest) => {
    setShowRequestFormId(service.id);
    setServiceId(
      service.service_id ? String(service.service_id) : String(service.id)
    );
    setAddOnId(service.add_on_id ? String(service.add_on_id) : '');
    setPickUpLat('');
    setPickUpLong('');
    setPickUpTime('');
  };

  const handleRequestService = () => {
    if (!userData) {
      Alert.alert('Please fetch user first!');
      return;
    }
    setLoading(true);
    const data: CreateServiceRequest = {
      user_id: userData.id,
      service_id: Number(serviceId),
      add_on_id: 1,
      pick_up_lat: Number(pickUpLat),
      pick_up_lng: Number(pickUpLong),
      pick_up_time: '2025-07-07 12:23:00',
    };
    createService(data).then((res) => {
      setLoading(false);
      if (res && res.data) {
        setRequestedService(res.data.data);
        setShowRequestFormId(null);
      } else {
        Alert.alert('Failed to request service');
      }
    });
  };

  const handleCancelService = () => {
    if (!requestedService) return;
    setLoading(true);
    cancelService(requestedService.id).then((res) => {
      setLoading(false);
      if (res && res.success) {
        Alert.alert(res.message);
        setRequestedService(null);
      } else {
        Alert.alert(res.message);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
      <Text style={styles.header}>Morni Provider Example</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Info</Text>
        {userData ? (
          <Text style={styles.userText}>
            User ID: {userData.id} - {userData.first_name} {userData.last_name}
          </Text>
        ) : (
          <Text style={styles.errorText}>No user loaded</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        <FlatList
          data={services}
          key={requestedService?.id}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>{item.name}</Text>
              {requestedService && requestedService.service_id === item.id ? (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelService}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Cancel Service</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openRequestForm(item)}
                  disabled={!!requestedService || loading}
                >
                  <Text style={styles.buttonText}>Request Service</Text>
                </TouchableOpacity>
              )}
              {showRequestFormId === item.id && !requestedService && (
                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>Request Service</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Service ID"
                    placeholderTextColor="#080808"
                    value={serviceId}
                    onChangeText={setServiceId}
                    keyboardType="numeric"
                    editable={!loading}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Add On ID"
                    placeholderTextColor="#080808"
                    value={addOnId}
                    onChangeText={setAddOnId}
                    keyboardType="numeric"
                    editable={!loading}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Pick Up Lat"
                    placeholderTextColor="#080808"
                    value={pickUpLat}
                    onChangeText={setPickUpLat}
                    keyboardType="numeric"
                    editable={!loading}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Pick Up Long"
                    placeholderTextColor="#080808"
                    value={pickUpLong}
                    onChangeText={setPickUpLong}
                    keyboardType="numeric"
                    editable={!loading}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Pick Up Time (YYYY-MM-DD HH:mm)"
                    placeholderTextColor="#080808"
                    value={pickUpTime}
                    onChangeText={setPickUpTime}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleRequestService}
                    disabled={loading}
                  >
                    <Text style={styles.buttonText}>Submit Request</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setShowRequestFormId(null)}
                    disabled={loading}
                  >
                    <Text style={{ color: '#6B4A9C', marginTop: 8 }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          ListEmptyComponent={<Text>No services found.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  userText: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  errorText: {
    color: '#D9534F',
    fontWeight: '600',
    marginVertical: 4,
  },
  successText: {
    color: '#28a745',
    fontWeight: '600',
    marginVertical: 4,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  serviceItem: {
    backgroundColor: '#FFF',
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cancelButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#FFF',
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
});
