from django.test import TestCase

# Un test simple para confirmar que el entorno de CI funciona
class SimpleTest(TestCase):
    def test_basic_arithmetic(self):
        self.assertEqual(1 + 1, 2)